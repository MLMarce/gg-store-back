import { IsString } from "class-validator";

export class CreateSizeDto {
    @IsString()
    name: string;
}

export class UpdateSizeDto {
    @IsString()
    name: string;
}