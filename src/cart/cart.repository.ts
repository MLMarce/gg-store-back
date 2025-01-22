import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  AddProductToCartDto,
  CreateCartDto,
  RemoveProductFromCartDto,
  UpdateCartDto,
} from 'src/dtos/cart.dto';
import { Cart } from 'src/entities/cart.entity';
import { CartProduct } from 'src/entities/cart_product.entity';
import { ProductSize } from 'src/entities/product_size.entity';
import { User } from 'src/entities/user.entity';
import {
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';

@Injectable()
export class CartRepository {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartProduct)
    private readonly cartProductRepository: Repository<CartProduct>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(ProductSize)
    private readonly productSizeRepository: Repository<ProductSize>,
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
    if (!createdCart)
      throw new BadRequestException('Error al crear el carrito');

    return createdCart;
  }

  async addProductToCart(product: AddProductToCartDto): Promise<Cart> {
    const foundCart = await this.cartRepository.findOne({
      where: { id: product.cartId },
    });
    if (!foundCart) throw new NotFoundException('Carrito no encontrado');

    const foundProductSize = await this.productSizeRepository.findOne({
      where: {
        id: product.productSizeId,
        stock: MoreThanOrEqual(product.quantity),
      },
      relations: { product: true },
    });
    if (!foundProductSize)
      throw new NotFoundException('Producto no disponible');
    foundProductSize.reservedStock += product.quantity;
    const updatedProductSize = await this.productSizeRepository.update(
      foundProductSize.id,
      foundProductSize,
    );
    if (!updatedProductSize)
      throw new BadRequestException(
        'Error al actualizar los datos del producto  ',
      );

    const productPrice = foundProductSize.product.price;
    const subtotal = productPrice * product.quantity;
    const discount = foundCart.discount || 0;

    const newCartProduct = new CartProduct();
    newCartProduct.cart = foundCart;
    newCartProduct.productSize = foundProductSize;
    newCartProduct.quantity = product.quantity;
    newCartProduct.subtotal = subtotal;

    const savedCartProduct =
      await this.cartProductRepository.save(newCartProduct);
    if (!savedCartProduct)
      throw new BadRequestException(
        'Error al guardar el producto en el carrito',
      );

    foundCart.totalPrice += subtotal - (subtotal * discount) / 100;
    const updatedCart = await this.cartProductRepository.update(
      foundCart.id,
      foundCart,
    );
    if (!updatedCart)
      throw new BadRequestException('Error al actualizar el carrito');

    const finalCart = await this.cartRepository.findOne({
      where: { id: foundCart.id },
      relations: { cartProducts: true },
    });
    if (!finalCart)
      throw new BadRequestException(
        'Error al obtener el carrito luego de agregar el producto',
      );

    return finalCart;
  }

  async deleteProductFromCart(
    removeProductFromCartDto: RemoveProductFromCartDto,
  ): Promise<Cart> {
    const foundCart = await this.cartRepository.findOne({
      where: { id: removeProductFromCartDto.cartId },
    });
    if (!foundCart) throw new NotFoundException('Carrito no encontrado');

    const foundProductSize = await this.productSizeRepository.findOne({
      where: { id: removeProductFromCartDto.productSizeId },
      relations: { product: true },
    });
    if (!foundProductSize) throw new NotFoundException('Talle no encontrado');

    foundProductSize.reservedStock -= removeProductFromCartDto.quantity;
    const updatedProductSize = await this.productSizeRepository.update(
      { id: foundProductSize.id },
      foundProductSize,
    );
    if (!updatedProductSize)
      throw new BadRequestException(
        'Error al actualizar los datos del producto',
      );

    const foundCartProduct = await this.cartProductRepository.findOne({
      where: { id: removeProductFromCartDto.cartProductId },
      relations: { productSize: true },
    });
    if (!foundCartProduct)
      throw new NotFoundException('Producto no encontrado en el carrito');

    const deletedCartProduct = await this.cartProductRepository.delete({
      id: foundCartProduct.id,
    });
    if (!deletedCartProduct)
      throw new BadRequestException(
        'Error al eliminar el producto del carrito',
      );
    const discount = foundCart.discount || 0;
    const subtotal = foundCartProduct.subtotal;
    foundCart.totalPrice -= subtotal - (subtotal * discount) / 100;
    const updatedCart = await this.cartProductRepository.update(
      foundCart.id,
      foundCart,
    );
    if (!updatedCart)
      throw new BadRequestException('Error al actualizar el carrito');
    const finalCart = await this.cartRepository.findOne({
      where: { id: foundCart.id },
      relations: { cartProducts: true },
    });
    if (!finalCart)
      throw new BadRequestException('Error al obtener el carrito actualizado');
    return finalCart;
  }

  async updateCart(cartId: string, cart: UpdateCartDto): Promise<Cart> {
    await this.cartRepository.update({ id: cartId }, cart);
    return await this.cartRepository.findOne({ where: { id: cartId } });
  }

  async deleteCart(cartId: string): Promise<void> {
    await this.cartRepository.delete({ id: cartId });
  }
}
