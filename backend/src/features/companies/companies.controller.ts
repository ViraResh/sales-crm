import {
    Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import type { User } from '@prisma/client';

@ApiTags('Companies')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('companies')
export class CompaniesController {
    constructor(private readonly companiesService: CompaniesService) {}

    @Post()
    create(@CurrentUser() user: User, @Body() dto: CreateCompanyDto) {
        return this.companiesService.create(user.id, dto);
    }

    @Get()
    findAll(@CurrentUser() user: User) {
        return this.companiesService.findAll(user.id);
    }

    @Get(':id')
    findOne(@CurrentUser() user: User, @Param('id') id: string) {
        return this.companiesService.findOne(id, user.id);
    }

    @Patch(':id')
    update(@CurrentUser() user: User, @Param('id') id: string, @Body() dto: UpdateCompanyDto) {
        return this.companiesService.update(id, user.id, dto);
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@CurrentUser() user: User, @Param('id') id: string) {
        return this.companiesService.remove(id, user.id);
    }
}