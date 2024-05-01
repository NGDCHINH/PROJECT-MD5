import { Injectable } from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizEntity } from './entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionsService } from '../questions/questions.service';

@Injectable()
export class QuizsService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    private readonly questionsService: QuestionsService,
  ) {}
  async create(createQuizDto: CreateQuizDto) {
    const quiz = new QuizEntity();
    quiz.title = createQuizDto.title;
    quiz.category = createQuizDto.category;
    quiz.passingPercentage = createQuizDto.passingPercentage;
    quiz.createdBy = createQuizDto.createdBy;
    const questions = await this.questionsService.findAll();
    quiz.questions = questions;
    return this.quizRepository.save(quiz);
  }

  async findAll() {
    const data = await this.quizRepository.find({
      relations: ['questions'],
    });

    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} quiz`;
  }

  update(id: number, updateQuizDto: UpdateQuizDto) {
    return `This action updates a #${id} quiz`;
  }

  remove(id: number) {
    return `This action removes a #${id} quiz`;
  }
}
