import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ContactsRepository {
    constructor(private readonly db: DatabaseService) {}

    create(ownerId: string, companyId: string, data: {
        firstName: string;
        lastName?: string;
        email?: string;
        phone?: string;
        position?: string;
    }) {
        return this.db.contact.create({
            data: {
                ...data,
                owner: { connect: { id: ownerId } },
                company: { connect: { id: companyId } },
            },
        });
    }

    findAllByOwner(ownerId: string, companyId?: string) {
        return this.db.contact.findMany({
            where: { ownerId, ...(companyId ? { companyId } : {}) },
            orderBy: { createdAt: 'desc' },
        });
    }

    findOneByOwner(id: string, ownerId: string) {
        return this.db.contact.findFirst({ where: { id, ownerId } });
    }

    update(id: string, ownerId: string, data: Prisma.ContactUpdateInput) {
        return this.db.contact.updateMany({ where: { id, ownerId }, data });
    }

    delete(id: string, ownerId: string) {
        return this.db.contact.deleteMany({ where: { id, ownerId } });
    }
}