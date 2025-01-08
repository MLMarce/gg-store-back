import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from 'src/dtos/category.dto';

@Injectable()
export class CategoryService {
    constructor(private readonly categoryRepository: CategoryRepository){}

    async getAllCategories() {
        return await this.categoryRepository.findAllCategories();
    }

    async getCategoryById(categoryId: string) {
        return await this.categoryRepository.findOneCategoryById(categoryId);
    }

    async createCategory(categoryDto: CreateCategoryDto) {
        return await this.categoryRepository.createCategory(categoryDto);
    }
}
