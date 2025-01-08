import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.entity';
import { ProductSize } from './product_size.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único generado automáticamente para el producto',
    example: '123e4567-e89b-12d3-a456-426614174005',
  })
  id: string;

  @Column({ type: 'varchar', unique: true })
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Camiseta Básica',
  })
  name: string;

  @Column({ type: 'text' })
  @ApiProperty({
    description: 'Descripción detallada del producto',
    example: 'Camiseta básica de algodón 100% con diseño minimalista.',
  })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  @ApiProperty({
    description: 'Precio del producto',
    example: 19.99,
  })
  price: number;

  @Column({ type: 'text', array: true })
  @ApiProperty({
    description: 'Lista de URLs de imágenes del producto',
    example: [
      'https://example.com/image1.jpg',
      'https://example.com/image2.jpg',
    ],
  })
  images: string[];

  @ManyToOne(() => Category, (category) => category.products)
  @ApiProperty({
    description: 'Categoría a la que pertenece el producto',
    type: () => Category,
  })
  category: Category;

  @OneToMany(() => ProductSize, (productSize) => productSize.product)
  @ApiProperty({
    description: 'Lista de relaciones entre productos y tamaños',
    type: () => [ProductSize],
  })
  productSizes: ProductSize[];
}
