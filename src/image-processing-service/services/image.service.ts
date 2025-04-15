import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';


@Injectable()
export class ImageService {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private userRepository: Repository<Image>,
  ) {}

  async findOne(id: number): Promise<Image | null> {
    return await this.userRepository.findOne({ where: { id }});
  }

  async findAll(): Promise<Image[] | null> {
    const allUsers = await this.userRepository.find();
    return allUsers
  }


  async create(): Promise<Image | null> {
    return null
  }

  async process(): Promise<Image[] | null> {
    return null
  }


}

