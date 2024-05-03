import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Req,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.strategy';

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async saveScore(@Body() createScoreDto: CreateScoreDto, @Req() req) {
    const userId = req.user.id;
    const quizId = req.body.quizId;
    return await this.scoreService.saveScore(createScoreDto, userId, quizId);
  }

  @Get()
  findAll() {
    return this.scoreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.update(+id, updateScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoreService.remove(+id);
  }
}
