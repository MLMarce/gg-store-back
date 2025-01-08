import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';
import { Size } from './size.entity';
import { OrderDetailProduct } from './order_detail_product.entity';
import { CartProduct } from './cart_product.entity';

@Entity({
  name: 'product_sizes',
})
export class ProductSize {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description:
      'ID único generado automáticamente para la relación Producto-Tamaño',
    example: '123e4567-e89b-12d3-a456-426614174011',
  })
  id: string;

  @Column({ type: 'int' })
  @ApiProperty({
    description: 'Cantidad de stock disponible para este producto y tamaño',
    example: 50,
  })
  stock: number;

  @Column({ type: 'int', default: 0 })
  @ApiProperty({
    description: 'Cantidad de stock reservado para este producto y tamaño',
    example: 5,
  })
  reservedStock: number;

  @ManyToOne(() => Product, (product) => product.productSizes)
  @ApiProperty({
    description: 'Producto asociado a este tamaño',
    type: () => Product,
  })
  product: Product;

  @ManyToOne(() => Size, (size) => size.productSizes)
  @ApiProperty({
    description: 'Tamaño asociado a este producto',
    type: () => Size,
  })
  size: Size;

  @OneToMany(
    () => OrderDetailProduct,
    (orderDetailProduct) => orderDetailProduct.productSize,
  )
  @ApiProperty({
    description:
      'Lista de detalles de orden que incluyen este producto y tamaño',
    type: () => [OrderDetailProduct],
  })
  orderDetailProducts: OrderDetailProduct[];
  
  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.productSize, {onDelete: 'CASCADE'})
  @ApiProperty({
    description: 'Lista de entradas en carritos que hacen referencia a este tamaño del producto',
    type: () => [CartProduct],
  })
  cartProducts: CartProduct[];
}
