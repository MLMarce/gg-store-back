
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCartDto {
    @IsString()
    @IsNotEmpty()
    userId: string;
}

export class UpdateCartDto {
    @IsArray()
    @IsOptional()
    items: { productId: string, quantity: number }[];
    @IsNumber()
    @IsOptional()
    discount: number;
}

export class AddProductToCartDto {
    @IsString()
    @IsNotEmpty()
    cartId: string;
    
    @IsString()
    @IsNotEmpty()
    productSizeId: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

}