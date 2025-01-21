import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from 'src/dtos/cart.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guards';
import { Roles } from 'src/decorators/roles.decorators';
import { Role } from 'src/enums/roles.enum';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return await this.cartService.create(createCartDto);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  async findAll() {
    return await this.cartService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.cartService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCartDto: UpdateCartDto) {
    return await this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return await this.cartService.remove(id);
  }
}
