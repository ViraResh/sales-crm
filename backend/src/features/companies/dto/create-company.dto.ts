import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCompanyDto {
    @ApiProperty({ example: 'Acme Inc' })
    @IsString()
    @MinLength(2)
    name: string;

    @ApiProperty({ example: 'https://acme.com', required: false })
    @IsOptional()
    @IsString()
    website?: string;

    @ApiProperty({ example: 'Software', required: false })
    @IsOptional()
    @IsString()
    industry?: string;

    @ApiProperty({ example: '+380...', required: false })
    @IsOptional()
    @IsString()
    phone?: string;
}