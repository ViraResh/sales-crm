import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserDto } from "../auth/dto/user.dto";

@Injectable()
export class UsersMapper {
    toDto(user: User): UserDto {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
    }
}