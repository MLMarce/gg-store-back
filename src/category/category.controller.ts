import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from 'src/dtos/category.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/enums/roles.enum';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all categories' })
  async getAllCategories() {
    return await this.categoryService.getAllCategories();
  }

  @Get(':categoryId')
  @ApiOperation({ summary: 'Retrieve category by ID' })
  async getCategoryById(
    @Param('categoryId', ParseUUIDPipe) categoryId: string,
  ) {
    return await this.categoryService.getCategoryById(categoryId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new category' })
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async createCategory(@Body() categoryDto: CreateCategoryDto) {
    return await this.categoryService.createCategory(categoryDto);
  }
}
