import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { QuizEntity } from './entities/quiz.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, In, Repository } from 'typeorm';
import { QuestionsService } from '../questions/questions.service';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizsService {
  constructor(
    @InjectRepository(QuizEntity)
    private readonly quizRepository: Repository<QuizEntity>,
    private readonly questionsService: QuestionsService,
  ) {}
  async create(createQuizDto: CreateQuizDto) {
    const existingQuiz = await this.quizRepository.findOne({
      where: { category: createQuizDto.category },
    });

    if (existingQuiz) {
      throw new ConflictException('Đã tồn tại quiz với category tương tự.');
    }

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
    const quizzes = await this.quizRepository.find({
      relations: ['questions'],
    });

    if (!quizzes || quizzes.length === 0) {
      throw new NotFoundException(`Không tìm thấy Quiz`);
    }
    const shuffledQuizzes = quizzes.sort(() => Math.random() - 0.5);
    const randomQuizzes = shuffledQuizzes.slice(0, 5);

    return randomQuizzes;
  }

  async findOne(id: number) {
    const data = await this.quizRepository.findOne({
      where: { id },
      relations: ['questions'],
    });
    return data;
  }

  async search(q: string) {
    const data = await this.quizRepository.find({
      where: { category: ILike(`%${q}%`) },
    });
    return data;
  }
  async update(id: number, updateQuizDto: UpdateQuizDto) {
    const data = await this.quizRepository.findOne({ where: { id } });

    if (!data) {
      throw new NotFoundException(`Không tìm thấy Quiz`);
    }

    Object.assign(data, UpdateQuizDto);

    await this.quizRepository.save(data);

    return `Sửa thành công`;
  }

  async remove(id: number) {
    const data = await this.quizRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(`Không tìm thấy Quiz`);
    }
    await this.quizRepository.remove(data);
    return `Xoá thành công`;
  }
}
