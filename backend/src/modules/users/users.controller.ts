import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.strategy';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  findUser(@Request() req) {
    const userID = req.user.userId;
    return this.usersService.findUser(userID);
  }
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
