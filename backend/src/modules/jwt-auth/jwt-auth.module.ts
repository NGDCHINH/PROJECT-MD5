import { Module, forwardRef } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { jwtAuthController } from './jwt-auth.controller';
import { JwtStrategy } from 'src/shared/strategies/jwt.strategy';
import { LocalStrategy } from 'src/shared/strategies/local.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [JwtAuthService, LocalStrategy, JwtStrategy],
  exports: [JwtAuthService],
  controllers: [jwtAuthController],
})
export class JwtAuthModule {}
