import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ImageService } from '../../services/image.service';
import { ImagesController } from '../../controllers/ImagesController';
import { userProviders } from '../../providers/image/image.providers';
import { DBModule } from '../db/database.module';

@Module({
  imports: [ DBModule ],
  providers: [...userProviders, ImageService],
  controllers: [ImagesController],
  exports: [ImageService]
})
export class ImageModule {}
