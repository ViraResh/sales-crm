import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../database/database.module';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { UsersMapper } from "./users.mapper";

@Module({
    // imports: [DatabaseModule],
    // providers: [UsersService, UsersRepository],
    // exports: [UsersRepository],
    providers: [UsersRepository, UsersMapper],
    exports: [UsersRepository, UsersMapper],
})
export class UsersModule {}