import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddProductToCartDto, CreateCartDto, RemoveProductFromCartDto, UpdateCartDto } from 'src/dtos/cart.dto';
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
  @Post('add-product')
  @UseGuards(AuthGuard)
  async addProduct(@Body() product: AddProductToCartDto) {
    return await this.cartService.addProduct(product);
  }

  @Delete('remove-product')
  @UseGuards(AuthGuard)
  async removeProduct(@Body() product: RemoveProductFromCartDto) {
    return await this.cartService.removeProduct(product);
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
