import { Role } from 'src/enums/roles.enum';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Review } from './review.entity';
import { Cart } from './cart.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    description: 'ID único generado automáticamente para el usuario',
    example: '123e4567-e89b-12d3-a456-426614174003',
  })
  id: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'Nombre del usuario',
    example: 'Carlos Garcia',
  })
  name: string;

  @Column({ type: 'varchar', unique: true })
  @ApiProperty({
    description: 'Correo electrónico del usuario',
    example: 'carlosgarcia@example.com',
  })
  email: string;

  @Column({ type: 'varchar' })
  @ApiProperty({
    description: 'Contraseña del usuario',
    example: 'P@ssw0rd123',
  })
  password: string;

  @Column({ type: 'bigint', default: 12345678 })
  @ApiProperty({
    description: 'Número de teléfono del usuario',
    example: 1234567890,
  })
  phone: number;

  @Column({ type: 'varchar', default: Role.User })
  @ApiProperty({
    description: 'Rol del usuario',
    example: Role.User,
    enum: Role,
  })
  role: Role;

  @Column({ type: 'varchar', default: 'active' })
  @ApiProperty({
    description: 'Estado del usuario, puede ser "active" o "deleted"',
    example: 'active',
  })
  status: 'active' | 'deleted';

  @Column({ type: 'varchar', nullable: true })
  @ApiProperty({
    description: 'Imagen del perfil del usuario',
    example: 'http://example.com/profile.jpg',
    required: false,
  })
  image: string;

  @OneToMany(() => Review, (review) => review.user)
  @ApiProperty({
    description: 'Lista de reseñas hechas por el usuario',
    type: [Review],
  })
  reviews: Review[];

  @OneToOne(() => Cart, (cart) => cart.user)
  @ApiProperty({
    description: 'Carrito de compras del usuario',
    type: Cart,
  })
  cart: Cart;
}
