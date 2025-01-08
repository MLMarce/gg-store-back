import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

@Entity({
  name: 'categories',
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único generado automáticamente para la categoría',
    example: '123e4567-e89b-12d3-a456-426614174004',
  })
  id: string;

  @Column({ type: 'varchar', unique: true })
  @ApiProperty({
    description: 'Nombre de la categoría',
    example: 'Ropa Casual',
  })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  @ApiProperty({
    description: 'Lista de productos asociados a esta categoría',
    type: () => [Product],
  })
  products: Product[];
}
