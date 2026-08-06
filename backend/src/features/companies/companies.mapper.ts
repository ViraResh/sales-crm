import { Injectable } from '@nestjs/common';
import { Company } from '@prisma/client';
import { CompanyDto } from "./dto/company.dto";

@Injectable()
export class CompaniesMapper {
    toDto(company: Company): CompanyDto {
        return {
            id: company.id,
            name: company.name,
            website: company.website,
            industry: company.industry,
            phone: company.phone,
            createdAt: company.createdAt,
            updatedAt: company.updatedAt,
        };
    }

    toDtoList(companies: Company[]): CompanyDto[] {
        return companies.map((c) => this.toDto(c));
    }
}