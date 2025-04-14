import { Controller, Get, Post, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }


  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @Get('sign-in')
  signIn(@Body() data: { username: string, password: string }) {
    return this.userService.signIn(data?.username, data?.password);
  }


  @Post()
  create(@Body() data: { username: string, password: string }) {
    return this.userService.create(data);
  }

  @Post('validate')
  async validate(@Headers('x-auth') token: string) {
    try {
      const userId = await this.userService.validateToken(token)
      console.log(userId, token)
      return { userId };
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
