import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';
import { OrderDetailProduct } from './order_detail_product.entity';

@Entity({
  name: 'order_details',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único generado automáticamente para el detalle de la orden',
    example: '123e4567-e89b-12d3-a456-426614174009',
  })
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({
    description: 'Precio total del detalle de la orden',
    example: 49.99,
  })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @ApiProperty({
    description: 'Descuento aplicado al detalle de la orden',
    example: 5.00,
  })
  discount: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  @ApiProperty({
    description: 'Orden asociada a este detalle',
    type: () => Order,
  })
  order: Order;

  @OneToMany(() => OrderDetailProduct, (orderDetailProduct) => orderDetailProduct.orderDetail)
  @ApiProperty({
    description: 'Lista de productos asociados al detalle de la orden',
    type: () => [OrderDetailProduct],
  })
  orderDetailProducts: OrderDetailProduct[];
}
