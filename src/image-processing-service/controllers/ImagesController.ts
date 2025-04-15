import { Controller, Get, Post, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { ImageService } from '../services/image.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImageService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.imagesService.findOne(id);
  }


  @Get()
  findAll() {
    // return this.imagesService.findAll();
    return 'lololo'
  }

  @Post('/upload')
  iploadImage() {
    return this.imagesService.create();
  }

  @Post('/process')
  processImage() {
    return this.imagesService.process();
  }
}
