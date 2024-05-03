import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ScoreEntity } from './entities/score.entity';
import { Repository } from 'typeorm';
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
    userId: number,
    quizId: number,
  ) {
    const quizs = await this.quizService.findOne(quizId);
    const users = await this.userService.findUser(userId);

    if (!quizs) {
      throw new NotFoundException(`Không tìm thấy quiz`);
    } else if (!users) {
      throw new NotFoundException(`Không tìm thấy người dùng`);
    }

    const score = this.scoreRepository.create({
      score: createScoreDto.score,
      total: createScoreDto.total,
      percentage: (createScoreDto.score / createScoreDto.total) * 100,
      result: this.calculateResult(
        (createScoreDto.score / createScoreDto.total) * 100,
      ),
      quiz: quizs,
      user: users,
    });

    return await this.scoreRepository.save(score);
  }
  calculateResult(percentage: number): string {
    if (percentage >= 70) {
      return 'Đạt';
    } else {
      return 'Trượt';
    }
  }

  findAll() {
    const data = this.scoreRepository.find();
    return data;
  }

  findOne(id: number) {
    const data = this.scoreRepository.findOne({ where: { id } });
  }

  async update(id: number, updateScoreDto: UpdateScoreDto) {
    const data = await this.scoreRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(`Không tìm thấy điểm số`);
    }
    Object.assign(data, updateScoreDto);
    await this.scoreRepository.save(updateScoreDto);
    return `Cập nhật điểm số thành công`;
  }

  async remove(id: number) {
    const data = await this.scoreRepository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException(`Không tìm thấy điểm số`);
    }
    await this.scoreRepository.remove(data);
    return `Xóa điểm số thành công`;
  }
}
