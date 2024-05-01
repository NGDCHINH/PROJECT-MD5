import { Module } from '@nestjs/common';
import { QuizsService } from './quizs.service';
import { QuizsController } from './quizs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuizEntity } from './entities/quiz.entity';
import { QuestionsService } from '../questions/questions.service';
import { QuestionEntity } from '../questions/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([QuizEntity, QuestionEntity])],
  controllers: [QuizsController],
  providers: [QuizsService, QuestionsService],
  exports: [QuizsService],
})
export class QuizsModule {}
