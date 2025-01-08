import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ProductSize } from './product_size.entity';

@Entity({
  name: 'sizes',
})
export class Size {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único generado automáticamente para el tamaño',
    example: '123e4567-e89b-12d3-a456-426614174006',
  })
  id: string;

  @Column({ type: 'varchar', unique: true })
  @ApiProperty({
    description: 'Nombre del tamaño',
    example: 'M',
  })
  name: string;

  @OneToMany(() => ProductSize, (productSize) => productSize.size)
  @ApiProperty({
    description: 'Lista de relaciones entre productos y este tamaño',
    type: () => [ProductSize],
  })
  productSizes: ProductSize[];
}
