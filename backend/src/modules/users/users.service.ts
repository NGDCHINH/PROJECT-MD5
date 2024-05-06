import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

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
      console.log('data login', user);

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

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng`);
    }

    if (updateUserDto.password) {
      const hashedPassword = await this.hashPassword(updateUserDto.password);
      user.password = hashedPassword;
    }

    if (updateUserDto.username) {
      user.username = updateUserDto.username;
    }

    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    if (updateUserDto.avatar) {
      const avatar = updateUserDto.avatar;

      try {
        const imageName = avatar.originalname;
        const imageDir = path.join('src', 'shared', 'image');
        const imagePath = path.join(imageDir, imageName);

        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir, { recursive: true });
        }
        fs.writeFileSync(imagePath, avatar.buffer);

        const bucket = admin.storage().bucket();
        const timestamp = new Date().getTime().toString();
        const firebaseImageName = `avatars/${timestamp}_${imageName}`;

        await bucket.upload(imagePath, {
          destination: firebaseImageName,
        });

        // Get the public URL of the uploaded file
        const avatarUrl = `https://storage.googleapis.com/${bucket.name}/${firebaseImageName}`;
        user.avatar = avatarUrl;
      } catch (error) {
        throw new HttpException(
          'Failed to upload avatar',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    await this.userRepository.save(user);

    return `Cập nhật thành công`;
  }
  async remove(id: number) {
    const data = await this.userRepository.findOne({ where: { id } });

    if (!data) {
      throw new NotFoundException(`Không tìm thấy người dùng`);
    }

    await this.userRepository.remove(data);
    return `Xoá thành công người này`;
  }
}
