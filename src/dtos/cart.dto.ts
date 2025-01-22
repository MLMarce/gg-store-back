import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCartDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class UpdateCartDto {
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

export class RemoveProductFromCartDto {
  @IsString()
  @IsNotEmpty()
  cartId: string;
  @IsString()
  @IsNotEmpty()
  cartProductId: string;
  @IsString()
  @IsNotEmpty()
  productSizeId: string;
  @IsNumber()
  @IsNotEmpty()
  quantity: number;
}
