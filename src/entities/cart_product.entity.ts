import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Cart } from './cart.entity';
import { ProductSize } from './product_size.entity';

@Entity({
  name: 'cart_products',
})
export class CartProduct {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description:
      'ID único generado automáticamente para el producto del carrito',
    example: '123e4567-e89b-12d3-a456-426614174022',
  })
  id: string;

  @Column({ type: 'int' })
  @ApiProperty({
    description: 'Cantidad del producto seleccionada para el carrito',
    example: 2,
  })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({
    description: 'Subtotal calculado para este producto en el carrito',
    example: 45.99,
  })
  subtotal: number;

  @ManyToOne(() => Cart, (cart) => cart.cartProducts, { onDelete: 'CASCADE' })
  @ApiProperty({
    description: 'Carrito al que pertenece este producto',
    type: () => Cart,
  })
  cart: Cart;

  @ManyToOne(() => ProductSize, (productSize) => productSize.cartProducts, {
    onDelete: 'SET NULL',
  })
  @ApiProperty({
    description:
      'Combinación de producto y tamaño seleccionada para el carrito',
    type: () => ProductSize,
  })
  productSize: ProductSize;
}
