import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderDetail } from './order_detail.entity';

@Entity({
  name: 'orders',
})
export class Order {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único generado automáticamente para la orden',
    example: '123e4567-e89b-12d3-a456-426614174008',
  })
  id: string;

  @Column({ type: 'timestamp' })
  @ApiProperty({
    description: 'Fecha y hora de creación de la orden',
    example: '2024-12-30T15:00:00Z',
  })
  date: Date;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn()
  @ApiProperty({
    description: 'Detalle asociado a esta orden',
    type: () => OrderDetail,
  })
  orderDetail: OrderDetail;
}
