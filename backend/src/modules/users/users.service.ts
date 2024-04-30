import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const checkEmail = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });
      if (checkEmail) {
        throw new Error('Email đã tồn tại');
      }
      const checkName = await this.userRepository.findOne({
        where: { username: createUserDto.username },
      });
      if (checkName) {
        throw new Error('Tên người dùng đã tồn tại');
      }

      const hashedPassword = await this.hashPassword(createUserDto.password);

      const user = this.userRepository.create({
        username: createUserDto.username,
        email: createUserDto.email,
        password: hashedPassword,
      });

      const newUser = await this.userRepository.save(user);

      return newUser;
    } catch (error) {
      return { error: error.message };
    }
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }
  async findOne(
    email: string,
    password: string,
  ): Promise<UserEntity | undefined> {
    try {
      const user = await this.userRepository.findOne({
        where: { email },
      });
      const isMatch = await bcrypt.compare(password, user.password);
      if (user && isMatch) {
        return user;
      } else {
        throw new Error(`User not found`);
      }
    } catch (err) {
      throw new Error(`Error finding ${err} user ${err.message}`);
    }
  }

  async findUser(userID: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id: userID },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
