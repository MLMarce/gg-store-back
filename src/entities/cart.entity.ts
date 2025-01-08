import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { CartProduct } from './cart_product.entity';

@Entity({
  name: 'carts',
})
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único generado automáticamente para el carrito',
    example: '123e4567-e89b-12d3-a456-426614174021',
  })
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty({
    description: 'Precio total del carrito',
    example: 150.75,
  })
  totalPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  @ApiProperty({
    description: 'Descuento aplicado al carrito',
    example: 10.5,
  })
  discount: number;

  @OneToOne(() => User, (user) => user.cart, { onDelete: 'CASCADE' })
  @JoinColumn()
  @ApiProperty({
    description: 'Usuario propietario del carrito',
    type: () => User,
  })
  user: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  @ApiProperty({
    description: 'Lista de productos en el carrito',
    type: () => [CartProduct],
  })
  cartProducts: CartProduct[];
}
