import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto, UpdateCartDto } from 'src/dtos/cart.dto';
import { Cart } from 'src/entities/cart.entity';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getAllCarts(): Promise<Cart[]> {
    return await this.cartRepository.find({
      relations: { cartProducts: { productSize: true }, user: true },
    });
  }

  async getCartById(cartId: string): Promise<Cart> {
    const foundCart = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: {
        cartProducts: { productSize: true },
        user: true,
      },
    });
    if (!foundCart)
      throw new NotFoundException('Carrito de compras no encontrado');

    return foundCart;
  }

  async createCart(cart: CreateCartDto): Promise<Cart> {
    const foundUser = await this.userRepository.findOne({
      where: { id: cart.userId },
    });
    if (!foundUser) throw new NotFoundException('Usuario no encontrado');

    const newCart = new Cart();
    newCart.user = foundUser;

    const createdCart = await this.cartRepository.save(newCart);
    if(!createdCart) throw new BadRequestException("Error al crear el carrito")
      
    return createdCart;
  }

  async addProductToCart() {
    
  }

  async updateCart(cartId: string, cart: UpdateCartDto): Promise<Cart> {
    await this.cartRepository.update({ id: cartId }, cart);
    return await this.cartRepository.findOne({ where: { id: cartId } });
  }

  async deleteCart(cartId: string): Promise<void> {
    await this.cartRepository.delete({ id: cartId });
  }
}
