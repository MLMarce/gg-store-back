import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { Size } from 'src/entities/size.entity';
import { ProductSize } from 'src/entities/product_size.entity';
import { ProductRepository } from './product.repository';

@Module({
  imports:[TypeOrmModule.forFeature([Product, Category, Size, ProductSize])],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class ProductModule {}
