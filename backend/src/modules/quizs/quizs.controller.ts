import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { QuizsService } from './quizs.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { JwtAuthGuard } from 'src/shared/guard/jwt-auth.strategy';

@Controller('quizs')
export class QuizsController {
  constructor(private readonly quizsService: QuizsService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizsService.create(createQuizDto);
  }
  @Get()
  findAll() {
    return this.quizsService.findAll();
  }

  @Get('search')
  search(@Query('q') q: string) {
    return this.quizsService.search(q);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizsService.update(+id, updateQuizDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quizsService.remove(+id);
  }
}
