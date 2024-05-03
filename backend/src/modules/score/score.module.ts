import { Module } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScoreEntity } from './entities/score.entity';
import { QuizsService } from '../quizs/quizs.service';
import { UsersService } from '../users/users.service';
import { QuizEntity } from '../quizs/entities/quiz.entity';
import { UserEntity } from '../users/entities/user.entity';
import { QuestionsService } from '../questions/questions.service';
import { QuestionEntity } from '../questions/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScoreEntity,
      QuizEntity,
      UserEntity,
      QuestionEntity,
    ]),
  ],
  controllers: [ScoreController],
  providers: [ScoreService, QuizsService, UsersService, QuestionsService],
})
export class ScoreModule {}
