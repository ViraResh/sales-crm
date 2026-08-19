import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateContactDto {
    @ApiProperty({ example: 'John' })
    @IsString()
    @MinLength(2)
    firstName: string;

    @ApiProperty({ example: 'Smith', required: false })
    @IsOptional()
    @IsString()
    lastName?: string;

    @ApiProperty({ example: 'john@acme.com', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: '+380...', required: false })
    @IsOptional()
    @IsString()
    phone?: string;

    @ApiProperty({ example: 'CTO', required: false })
    @IsOptional()
    @IsString()
    position?: string;

    @ApiProperty({ example: 'cuid-of-company' })
    @IsString()
    companyId: string;
}