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

  @UseGuards(JwtAuthGuard)
  @Post('save/:quizId')
  async saveScore(
    @Body() createScoreDto: CreateScoreDto,
    @Req() req,
    @Param('quizId') quizId: number,
  ) {
    const userID = req.user.id;
    console.log('userID', userID);

    return await this.scoreService.saveScore(createScoreDto, userID, quizId);
  }
  @Get()
  findAll() {
    return this.scoreService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOne(@Req() req) {
    const userID = req.user.id;
    return this.scoreService.findOne(userID);
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
