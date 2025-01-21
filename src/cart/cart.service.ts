import { Injectable } from '@nestjs/common';
import { CreateCartDto, UpdateCartDto } from 'src/dtos/cart.dto';

@Injectable()
export class CartService {
  async create(createCartDto: CreateCartDto) {
    return await 'This action adds a new cart';
  }

  async findAll() {
    return await `This action returns all cart`;
  }

  async findOne(id: string) {
    return await `This action returns a #${id} cart`;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    return await `This action updates a #${id} cart`;
  }

  async remove(id: string) {
    return await `This action removes a #${id} cart`;
  }
}
