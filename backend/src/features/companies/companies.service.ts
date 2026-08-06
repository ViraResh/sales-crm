import { Injectable, NotFoundException } from '@nestjs/common';
import { CompaniesRepository } from './companies.repository';
import { CompaniesMapper } from './companies.mapper';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
    constructor(
        private readonly repository: CompaniesRepository,
        private readonly mapper: CompaniesMapper,
    ) {}

    async create(ownerId: string, dto: CreateCompanyDto) {
        const company = await this.repository.create(ownerId, dto);
        return this.mapper.toDto(company);
    }

    async findAll(ownerId: string) {
        const companies = await this.repository.findAllByOwner(ownerId);
        return this.mapper.toDtoList(companies);
    }

    async findOne(id: string, ownerId: string) {
        const company = await this.repository.findOneByOwner(id, ownerId);
        if (!company) {
            throw new NotFoundException('Company not found');
        }
        return this.mapper.toDto(company);
    }

    async update(id: string, ownerId: string, dto: UpdateCompanyDto) {
        const result = await this.repository.update(id, ownerId, dto);
        if (result.count === 0) {
            throw new NotFoundException('Company not found');
        }
        return this.findOne(id, ownerId);
    }

    async remove(id: string, ownerId: string) {
        const result = await this.repository.delete(id, ownerId);
        if (result.count === 0) {
            throw new NotFoundException('Company not found');
        }
    }
}