import { DataSource } from 'typeorm';
import { Image } from '../../entities/image.entity';

export const userProviders = [
  {
    provide: 'IMAGE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Image),
    inject: ['DATA_SOURCE'],
  },
];
