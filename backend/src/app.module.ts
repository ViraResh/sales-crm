import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { HealthModule } from './features/health/health.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './features/auth/auth.module';
import { UsersModule } from './features/users/users.module';
import jwtConfig from "./config/jwt.config";
import { CompaniesModule } from "./features/companies/companies.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [jwtConfig],
        }),
        HealthModule,
        DatabaseModule,
        AuthModule,
        UsersModule,
        CompaniesModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
