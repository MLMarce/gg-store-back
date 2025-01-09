import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/product.dto';
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { ProductSize } from 'src/entities/product_size.entity';
import { Size } from 'src/entities/size.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
  ) {}

  async getAllProducts() {
    const products = await this.productRepository.find();

    if (!products.length)
      throw new NotFoundException('No hay productos guardados');
    return products;
  }

  async getProductById(id: string) {
    const product = await this.productRepository.findOne({
      where: { id: id },
      relations: { category: true, productSizes: true },
    });
    if (!product) throw new NotFoundException('Producto no encontrado');
    return product;
  }

  async createProduct(productDto: CreateProductDto) {
    const foundCategory = await this.categoryRepository.findOne({
      where: { name: productDto.categoryName },
    });
    if (!foundCategory)
      throw new NotFoundException('No se encontro la categoria');

    const newProduct = new Product();
    newProduct.name = productDto.name;
    newProduct.price = productDto.price;
    newProduct.description = productDto.description;
    newProduct.images = productDto.images;
    newProduct.category = foundCategory;

    await Promise.all(
      productDto.sizesAndQuantities.map(async (sizeQuantity) => {
        try {
          const foundSize = await this.sizeRepository.findOne({
            where: { name: sizeQuantity.size },
          });
          if (!foundSize) throw new NotFoundException('Talle no encontrado');
          const productSize = new ProductSize();
          productSize.product = newProduct;
          productSize.size = foundSize;
          productSize.stock = sizeQuantity.quantity;
          await this.productSizeRepository.save(productSize);
        } catch (error) {
          throw new BadRequestException(error);
        }
      }),
    );
    const productSizes = await this.productSizeRepository.find({where: {product: newProduct}})
    newProduct.productSizes = productSizes

    const createdProduct = await this.productRepository.save(newProduct);
    if(!createdProduct) throw new BadRequestException("Error al agregar el producto")
    return createdProduct;
  }

  async updateProduct(id: string, productDto: UpdateProductDto) {
    const foundProduct = await this.productRepository.findOne({ where: { id: id } });
    if (!foundProduct) throw new NotFoundException('Producto no encontrado');
    await this.productRepository.update(id, productDto);
    const updatedProduct = await this.productRepository.findOne({ where: { id: id } });

    return `producto actualizado correctamente, ${updatedProduct}`
  }

  async deleteProduct(id: string) {
    const foundProduct = await this.productRepository.findOne({ where: { id: id } });
    if (!foundProduct) throw new NotFoundException('Producto no encontrado');
    await this.productRepository.delete({ id: id });
    return `Product with id ${id} has been deleted`;
  }
}
