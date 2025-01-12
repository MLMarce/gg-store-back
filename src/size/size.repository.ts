import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSizeDto, UpdateSizeDto } from 'src/dtos/size.dto';
import { Size } from 'src/entities/size.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SizeRepository {
  constructor(
    @InjectRepository(Size) private readonly sizeRepository: Repository<Size>,
  ) {}

  async getAllSizes(): Promise<Size[]> {
    const sizes = await this.sizeRepository.find();
    return sizes;
  }

  async findSizeById(id: string): Promise<Size> {
    const foundSize = await this.sizeRepository.findOne({ where: { id: id } });
    if (!foundSize) throw new NotFoundException("Talle no encontrado")
        
    return foundSize;
  }

  async createSize(size: CreateSizeDto): Promise<Size> {
    const foundSize = await this.sizeRepository.findOne({ where: {name: size.name}})
    if(foundSize) throw new BadRequestException("El talle ya existe")
        
    const newSize = new Size();
    newSize.name = size.name;
    const createdSize = await this.sizeRepository.save(newSize);
    if(!createdSize) throw new BadRequestException("Error al crear el talle")
        
    return createdSize;
  }

  async updateSize(id: string, size: UpdateSizeDto): Promise<string> {
    const foundSize = await this.sizeRepository.findOne({ where: { id: id } });
    if (!foundSize) throw new NotFoundException('Talle no encontrado');

    const updatedSize = await this.sizeRepository.update(id, size);
    if (!updatedSize)
      throw new BadRequestException('Error al actualizar el talle');

    return 'talle actualizado correctamente';
  }

  async deleteSize(id: string): Promise<string> {
    const foundSize = await this.sizeRepository.findOne({ where: { id: id } });
    if (!foundSize) throw new NotFoundException('Talle no encontrado');
    try{
        await this.sizeRepository.delete(id);
        return 'Talle eliminado correctamente';
    } catch {
        throw new BadRequestException('Error al eliminar el talle');
    }
  }
}
