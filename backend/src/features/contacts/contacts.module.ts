import { Module } from '@nestjs/common';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { ContactsRepository } from './contacts.repository';
import { ContactsMapper } from './contacts.mapper';
import { CompaniesModule } from '../companies/companies.module';

@Module({
    imports: [CompaniesModule],
    controllers: [ContactsController],
    providers: [ContactsService, ContactsRepository, ContactsMapper],
})
export class ContactsModule {}