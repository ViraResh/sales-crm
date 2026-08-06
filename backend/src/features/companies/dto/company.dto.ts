import { ApiProperty } from '@nestjs/swagger';

export class CompanyDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false, nullable: true })
    website?: string | null;

    @ApiProperty({ required: false, nullable: true })
    industry?: string | null;

    @ApiProperty({ required: false, nullable: true })
    phone?: string | null;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}