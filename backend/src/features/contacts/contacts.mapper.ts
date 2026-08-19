import { Injectable } from '@nestjs/common';
import { Contact } from '@prisma/client';
import { ContactDto } from './dto/contact.dto';

@Injectable()
export class ContactsMapper {
    toDto(contact: Contact): ContactDto {
        return {
            id: contact.id,
            firstName: contact.firstName,
            lastName: contact.lastName,
            email: contact.email,
            phone: contact.phone,
            position: contact.position,
            companyId: contact.companyId,
            createdAt: contact.createdAt,
            updatedAt: contact.updatedAt,
        };
    }

    toDtoList(contacts: Contact[]): ContactDto[] {
        return contacts.map((c) => this.toDto(c));
    }
}