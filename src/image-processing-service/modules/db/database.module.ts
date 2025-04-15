import { Module } from '@nestjs/common';
import { databaseProviders } from '../../providers/db/db.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DBModule {}
