import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { DatabaseService } from '../../database/database.service';

@Injectable()
export class UsersRepository {
    constructor(private readonly db: DatabaseService) {}

    async findByEmail(email: string): Promise<User | null> {
        return this.db.user.findUnique({
            where: { email },
        });
    }

    async create(data: Prisma.UserCreateInput): Promise<User> {
        return this.db.user.create({
            data,
        });
    }
}