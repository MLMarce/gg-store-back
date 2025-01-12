import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { SizeRepository } from './size.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Size } from 'src/entities/size.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Size])],
  controllers: [SizeController],
  providers: [SizeService, SizeRepository],
})
export class SizeModule {}
