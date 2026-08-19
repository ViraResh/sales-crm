import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { ContactsRepository } from './contacts.repository';
import { ContactsMapper } from './contacts.mapper';
import { CompaniesRepository } from '../companies/companies.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
    constructor(
        private readonly repository: ContactsRepository,
        private readonly mapper: ContactsMapper,
        private readonly companiesRepository: CompaniesRepository,
    ) {}

    async create(ownerId: string, dto: CreateContactDto) {
        const { companyId, ...data } = dto;

        // Перевірка: компанія існує і належить цьому юзеру
        const company = await this.companiesRepository.findOneByOwner(companyId, ownerId);
        if (!company) {
            throw new ForbiddenException('Company not found or access denied');
        }

        const contact = await this.repository.create(ownerId, companyId, data);
        return this.mapper.toDto(contact);
    }

    async findAll(ownerId: string, companyId?: string) {
        const contacts = await this.repository.findAllByOwner(ownerId, companyId);
        return this.mapper.toDtoList(contacts);
    }

    async findOne(id: string, ownerId: string) {
        const contact = await this.repository.findOneByOwner(id, ownerId);
        if (!contact) {
            throw new NotFoundException('Contact not found');
        }
        return this.mapper.toDto(contact);
    }

    async update(id: string, ownerId: string, dto: UpdateContactDto) {
        const result = await this.repository.update(id, ownerId, dto);
        if (result.count === 0) {
            throw new NotFoundException('Contact not found');
        }
        return this.findOne(id, ownerId);
    }

    async remove(id: string, ownerId: string) {
        const result = await this.repository.delete(id, ownerId);
        if (result.count === 0) {
            throw new NotFoundException('Contact not found');
        }
    }
}