import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class JwtAuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.userService.findOne(email, password);
  }

  async login(user: any) {
    try {
      const payload = {
        id: user.id,
        role: user.role,
        username: user.username,
        avatar: user.avatar,
      };
      console.log('payload', payload);

      if (user.role === 0 || user.role === undefined) {
        payload.role = 'User';
      } else {
        payload.role = 'Admin';
      }

      return {
        ...payload,
        token: this.jwtService.sign(payload),
      };
    } catch (error) {
      throw new Error(`Error logging in ${error} user ${error.message}`);
    }
  }
}
