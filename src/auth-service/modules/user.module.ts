import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/UserController';
import { userProviders } from '../providers/user.providers';
import { DBModule } from '../db/database.module';

@Module({
  imports: [DBModule], // здесь регистрируется DATA_SOURCE
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService], // если понадобится использовать где-то ещё
})
export class UserModule {}
