import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class CompaniesRepository {
    constructor(private readonly db: DatabaseService) {}

    create(ownerId: string, data: Prisma.CompanyCreateInput extends never ? never : {
        name: string;
        website?: string;
        industry?: string;
        phone?: string;
    }) {
        return this.db.company.create({
            data: { ...data, owner: { connect: { id: ownerId } } },
        });
    }

    findAllByOwner(ownerId: string) {
        return this.db.company.findMany({
            where: { ownerId },
            orderBy: { createdAt: 'desc' },
        });
    }

    findOneByOwner(id: string, ownerId: string) {
        return this.db.company.findFirst({
            where: { id, ownerId },
        });
    }

    update(id: string, ownerId: string, data: Prisma.CompanyUpdateInput) {
        return this.db.company.updateMany({
            where: { id, ownerId },
            data,
        });
    }

    delete(id: string, ownerId: string) {
        return this.db.company.deleteMany({
            where: { id, ownerId },
        });
    }
}