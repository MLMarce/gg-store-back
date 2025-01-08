import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderDetail } from './order_detail.entity';
import { ProductSize } from './product_size.entity';

@Entity({
  name: 'order_detail_products',
})
export class OrderDetailProduct {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description:
      'ID único generado automáticamente para el producto en el detalle de la orden',
    example: '123e4567-e89b-12d3-a456-426614174010',
  })
  id: string;

  @Column({ type: 'int' })
  @ApiProperty({
    description: 'Cantidad del producto en la orden',
    example: 2,
  })
  quantity: number;

  @ManyToOne(
    () => OrderDetail,
    (orderDetail) => orderDetail.orderDetailProducts,
  )
  @ApiProperty({
    description: 'Detalle de la orden al que pertenece este producto',
    type: () => OrderDetail,
  })
  orderDetail: OrderDetail;

  @ManyToOne(
    () => ProductSize,
    (productSize) => productSize.orderDetailProducts,
  )
  @ApiProperty({
    description: 'Producto y tamaño asociado a este detalle de la orden',
    type: () => ProductSize,
  })
  productSize: ProductSize;
}
