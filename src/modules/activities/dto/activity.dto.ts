import { Type } from "class-transformer";
import { IsString, IsNumber, IsDateString, IsNotEmpty, IsOptional, ValidateNested, IsArray } from "class-validator";

class SupplyInput {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsNumber()
    @IsNotEmpty()
    duration: number;

    @IsString()
    @IsNotEmpty()
    parcelId: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SupplyInput)
    supplies: SupplyInput[];
}