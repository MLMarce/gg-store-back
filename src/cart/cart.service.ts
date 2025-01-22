import { Injectable } from '@nestjs/common';
import { AddProductToCartDto, CreateCartDto, RemoveProductFromCartDto, UpdateCartDto } from 'src/dtos/cart.dto';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}
  async create(createCartDto: CreateCartDto) {
    return await this.cartRepository.createCart(createCartDto);
  }

  async findAll() {
    return await this.cartRepository.getAllCarts();
  }

  async findOne(id: string) {
    return await this.cartRepository.getCartById(id);
  }
  async addProduct(product: AddProductToCartDto) {
    return await this.cartRepository.addProductToCart(product);
  }
  async removeProduct(removeProductFromCartDto: RemoveProductFromCartDto) {
    return await this.cartRepository.deleteProductFromCart(removeProductFromCartDto);
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return await this.cartRepository.updateCart(id, updateCartDto)
  }

  async remove(id: string) {
    return await this.cartRepository.deleteCart(id)
  }
}
