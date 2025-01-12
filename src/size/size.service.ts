import { Injectable } from '@nestjs/common';
import { CreateSizeDto, UpdateSizeDto } from 'src/dtos/size.dto';
import { SizeRepository } from './size.repository';

@Injectable()
export class SizeService {
  constructor(private readonly sizeRepository: SizeRepository){}
  async create(createSizeDto: CreateSizeDto) {
    return await this.sizeRepository.createSize(createSizeDto);
  }

  async findAll() {
    return await this.sizeRepository.getAllSizes();
  }

  async findOne(id: string) {
    return await this.sizeRepository.findSizeById(id);
  }

  async update(id: string, updateSizeDto: UpdateSizeDto) {
    return await this.sizeRepository.updateSize(id, updateSizeDto);
  }

  async remove(id: string) {
    return await this.sizeRepository.deleteSize(id)
  }
}
