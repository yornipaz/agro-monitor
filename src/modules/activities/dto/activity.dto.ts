import { IsString, IsNumber, IsDateString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateActivityDto {
    @IsString()
    @IsNotEmpty()
    type: string; // Type of activity (e.g., planting, irrigation)
    @IsString()
    @IsNotEmpty()
    name: string; // Type of activity (e.g., planting, irrigation)
    @IsDateString()
    @IsNotEmpty()
    date: string; // ISO date format (e.g., 2023-12-01)

    @IsNumber()
    @IsNotEmpty()
    duration: number; // Duration in hours



    @IsString()
    @IsNotEmpty()
    parcelId: string; // The ID of the related parcel
}