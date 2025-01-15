import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateParcelDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    location: string;

    @IsNumber()
    @IsNotEmpty()
    latitude: number;

    @IsNumber()
    @IsNotEmpty()
    longitude: number;

    @IsNumber()
    @IsNotEmpty()
    size: number;

    @IsString()
    @IsOptional()
    cropType?: string;
}