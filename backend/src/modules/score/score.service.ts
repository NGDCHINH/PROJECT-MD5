import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreEntity } from './entities/score.entity';
import { Repository } from 'typeorm';
import { QuizEntity } from '../quizs/entities/quiz.entity';
import { UserEntity } from '../users/entities/user.entity';
import { QuizsService } from '../quizs/quizs.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ScoreService {
  constructor(
    @InjectRepository(ScoreEntity)
    private readonly scoreRepository: Repository<ScoreEntity>,
    private readonly quizService: QuizsService,
    private readonly userService: UsersService,
  ) {}

  async saveScore(
    createScoreDto: CreateScoreDto,
    userID: number,
    quizId: number,
  ) {
    const quiz = await this.quizService.findOne(quizId);
    if (!quiz) {
      throw new NotFoundException(`Không tìm thấy bài kiểm tra`);
    }
    const user = await this.userService.findUser(userID);
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng`);
    }
    const percentage = (createScoreDto.score / createScoreDto.total) * 100;
    const result = this.calculateResult(percentage);
    const score = this.scoreRepository.create({
      ...createScoreDto,
      percentage,
      result,
      user,
      quiz,
    });
    await this.scoreRepository.save(score);
    return score;
  }
  calculateResult(percentage: number): string {
    return percentage >= 80 ? 'Đậu' : 'Rớt';
  }

  async findAll(): Promise<ScoreEntity[]> {
    return this.scoreRepository.find({
      relations: ['quiz', 'user'],
    });
  }

  async findOne(userID: number): Promise<ScoreEntity> {
    const score = await this.scoreRepository.findOne({
      where: { id: userID },
      relations: ['quiz', 'user'],
    });
    if (!score) {
      throw new NotFoundException(`Không tìm thấy điểm số`);
    }
    return score;
  }

  async update(id: number, updateScoreDto: UpdateScoreDto): Promise<string> {
    const score = await this.scoreRepository.findOne({ where: { id } });
    if (!score) {
      throw new NotFoundException(`Không tìm thấy điểm số`);
    }
    Object.assign(score, updateScoreDto);
    await this.scoreRepository.save(score);

    return `Cập nhật điểm số thành công`;
  }
  async remove(id: number): Promise<string> {
    const score = await this.scoreRepository.findOne({ where: { id } });
    if (!score) {
      throw new NotFoundException(`Không tìm thấy điểm số`);
    }
    await this.scoreRepository.remove(score);
    return `Xóa điểm số thành công`;
  }
}
