import { Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.createProduct(createProductDto);
  }

  async findAll() {
    return await this.productRepository.getAllProducts();
  }

  async findOne(id: string) {
    return await this.productRepository.getProductById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.updateProduct(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productRepository.deleteProduct(id);
  }
}
