import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './configs/ormconfig';
import { JwtAuthModule } from './modules/jwt-auth/jwt-auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuestionsModule } from './modules/questions/questions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(config),
    UsersModule,
    QuestionsModule,
    JwtAuthModule,
  ],
  controllers: [],
  providers: [ConfigService],
})
export class AppModule {}
