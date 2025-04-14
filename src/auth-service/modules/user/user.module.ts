import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from '../../services/user.service';
import { UserController } from '../../controllers/UserController';
import { userProviders } from '../../providers/user/user.providers';
import { DBModule } from '../db/database.module';
import { secretKey } from '../../jwt-secret-key';

@Module({
  imports: [
    DBModule,
    JwtModule.register({
      secret: secretKey,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [...userProviders, UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
