import { Module } from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CompaniesRepository } from './companies.repository';
import { CompaniesMapper } from './companies.mapper';

@Module({
    controllers: [CompaniesController],
    providers: [CompaniesService, CompaniesRepository, CompaniesMapper],
    exports: [CompaniesRepository],
})
export class CompaniesModule {}