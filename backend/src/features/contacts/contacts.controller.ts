import {
    Body, Controller, Delete, Get, Param, Patch, Post,
    Query, UseGuards, HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import type { User } from '@prisma/client';

@ApiTags('Contacts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}

    @Post()
    create(@CurrentUser() user: User, @Body() dto: CreateContactDto) {
        return this.contactsService.create(user.id, dto);
    }

    @Get()
    @ApiQuery({ name: 'companyId', required: false })
    findAll(@CurrentUser() user: User, @Query('companyId') companyId?: string) {
        return this.contactsService.findAll(user.id, companyId);
    }

    @Get(':id')
    findOne(@CurrentUser() user: User, @Param('id') id: string) {
        return this.contactsService.findOne(id, user.id);
    }

    @Patch(':id')
    update(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: UpdateContactDto) {
        return this.contactsService.update(id, user.id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@CurrentUser() user: User, @Param('id') id: string) {
        return this.contactsService.remove(id, user.id);
    }
}