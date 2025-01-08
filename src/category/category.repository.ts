import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dtos/category.dto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();
    if (!categories.length)
      throw new NotFoundException('No hay categorias guardadas');

    return categories;
  }

  async findOneCategoryById(categoryId: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: {
        products: { productSizes: true },
      },
    });
    if (!category)
      throw new NotFoundException(
        'No se encontro la categoria con el id: ' + categoryId,
      );

    return category;
  }

  async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    const foundCategory = await this.categoryRepository.findOne({where: {name: categoryDto.name}})
    if (foundCategory) throw new BadRequestException('Ya existe una categoria con este nombre');

    const category = new Category()
    category.name = categoryDto.name;

    const createdCategory = await this.categoryRepository.save(category);

    if (!createdCategory) throw new BadRequestException("No se pudo crear la categoria")
    
    return createdCategory;
  }
}
