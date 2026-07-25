import {
    BadRequestException,
    Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../users/users.repository';
import { RegisterDto } from './dto/register.dto';
import {UsersMapper} from "../users/users.mapper";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) {}

    async register(dto: RegisterDto) {
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

        return UsersMapper.toAuthResponse(user);
    }
}