import { IsArray, IsDecimal, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

type SizeQuantity = {
    size: string,
    quantity: number,
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNumber()
    @IsNotEmpty()
    price: number;
    @IsString()
    @IsNotEmpty()
    description: string;
    @IsArray()
    @IsNotEmpty()
    images: string[];
    @IsString()
    @IsNotEmpty()
    categoryName: string;
    @IsArray()
    @IsNotEmpty()
    sizesAndQuantities: SizeQuantity[];
}


export class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string;
    @IsDecimal()
    @IsOptional()
    price: number;
    @IsString()
    @IsOptional()
    description: string;
    @IsArray()
    @IsOptional()
    images: string[];
}