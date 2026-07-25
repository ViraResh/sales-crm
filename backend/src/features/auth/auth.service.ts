import {
    BadRequestException,
    Injectable, UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../users/users.repository';
import { RegisterDto } from './dto/register.dto';
import { UsersMapper } from "../users/users.mapper";
import { LoginDto } from "./dto/login.dto";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { JwtPayload } from "./types/jwt-payload.type";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService,
        private readonly usersMapper: UsersMapper,
    ) {}

    async register(dto: RegisterDto): Promise<AuthResponseDto> {
        const existingUser = await this.usersRepository.findByEmail(dto.email);

        if (existingUser) {
            throw new BadRequestException('Email already exists');
        }

        const passwordHash = await bcrypt.hash(dto.password, 10);

        const user = await this.usersRepository.create({
            email: dto.email,
            passwordHash,
            firstName: dto.firstName,
            lastName: dto.lastName,
        });

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            user: this.usersMapper.toDto(user),
        };
    }

    async login(dto: LoginDto): Promise<AuthResponseDto> {
        const user = await this.usersRepository.findByEmail(dto.email);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const passwordMatches = await bcrypt.compare(dto.password, user.passwordHash);
        if (!passwordMatches) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };
        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
            user: this.usersMapper.toDto(user),
        };
    }
}