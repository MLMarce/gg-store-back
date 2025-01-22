import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { User } from 'src/entities/user.entity';
import { CartProduct } from 'src/entities/cart_product.entity';
import { ProductSize } from 'src/entities/product_size.entity';
import { CartRepository } from './cart.repository';

@Module({imports: [TypeOrmModule.forFeature([Cart, User, CartProduct, ProductSize])],
  controllers: [CartController],
  providers: [CartService, CartRepository],
})
export class CartModule {}
