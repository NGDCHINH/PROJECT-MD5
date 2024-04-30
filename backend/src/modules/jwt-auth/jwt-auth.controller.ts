import {
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { LocalAuthGuard } from './../../shared/guard/local-auth.guard';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.strategy';
import { JwtAuthService } from './jwt-auth.service';

@Controller('auth')
export class jwtAuthController {
  constructor(private jwtAuthService: JwtAuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.jwtAuthService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected-route')
  getProfile(@Request() req) {
    return req.user;
  }
}
