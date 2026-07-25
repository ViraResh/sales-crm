import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { UsersMapper } from "../users/users.mapper";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import type { User } from '@prisma/client';
import { CurrentUser } from "../../common/decorators/current-user.decorator";

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
    constructor(private readonly authService: AuthService,
                private readonly usersMapper: UsersMapper,
                ) {}

    @Post('register')
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    me(@CurrentUser() user: User) {
        return this.usersMapper.toDto(user);
    }
}
