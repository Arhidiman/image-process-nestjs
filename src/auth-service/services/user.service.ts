import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { secretKey } from '../jwt-secret-key';
import type { DecodeOptions } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async findOne(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id }});
  }

  
  async findAll(): Promise<User[] | null> {
    const allUsers = await this.userRepository.find();
    return allUsers
  }

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ token: string }> {
    const user = await this.userRepository.findOne(({ where: { username }}));
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { userId: user.id, username: user.username };

    const token = await this.jwtService.signAsync(payload, { secret: secretKey})

    await this.userRepository.update({ id: user?.id }, { token })

    return { token }
  }

  async create(user: { username: string, password: string } ) {
    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);

    const payload = { userId: savedUser.id, username: savedUser.username };

    const token = await this.jwtService.signAsync(payload, { secret: secretKey})
    
    return await this.userRepository.save({...savedUser, token});
  }


  async validateToken (token: string): Promise<number | null> {
    const data: { userId: number, username: string } = await this.jwtService.verifyAsync(token, { secret: secretKey})

    const { userId: id } = data

    const user = id && await this.userRepository.findOne({ where: { id }})

    return user && id
  }
}

