import { ApiProperty } from '@nestjs/swagger';

export class ContactDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    firstName: string;

    @ApiProperty({ required: false, nullable: true })
    lastName?: string | null;

    @ApiProperty({ required: false, nullable: true })
    email?: string | null;

    @ApiProperty({ required: false, nullable: true })
    phone?: string | null;

    @ApiProperty({ required: false, nullable: true })
    position?: string | null;

    @ApiProperty()
    companyId: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;
}