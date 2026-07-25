import { User } from '@prisma/client';

import { AuthResponseDto } from '../auth/dto/auth-response.dto';

export class UsersMapper {
    static toAuthResponse(user: User): AuthResponseDto {
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
    }
}