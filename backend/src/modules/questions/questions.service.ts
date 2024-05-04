import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionEntity } from './entities/question.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = new QuestionEntity();
    question.category = createQuestionDto.category;
    question.question = createQuestionDto.question;
    question.options = createQuestionDto.options;
    question.correctOption = createQuestionDto.correctOption;

    if (createQuestionDto.image) {
      try {
        const imageUrl = createQuestionDto.image;
        const imageName = path.basename(imageUrl);
        const imageDir = path.join('src', 'shared', 'image');
        const imagePath = path.join(imageDir, imageName);

        if (!fs.existsSync(imageDir)) {
          fs.mkdirSync(imageDir, { recursive: true });
        }

        const response = await axios({
          method: 'GET',
          url: imageUrl,
          responseType: 'stream',
        });

        response.data.pipe(fs.createWriteStream(imagePath));

        // Upload image to Firebase Storage
        const bucket = admin.storage().bucket();
        const timestamp = new Date().getTime().toString();
        const firebaseImageName = `images/${timestamp}_${imageName}`;

        await bucket.upload(imagePath, {
          destination: firebaseImageName,
        });

        // Get the public URL of the uploaded file
        question.image = `https://storage.googleapis.com/${bucket.name}/${firebaseImageName}`;
      } catch (error) {
        throw new HttpException(
          'Failed to download and upload image',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    return this.questionRepository.save(question);
  }

  async findAll() {
    const data = await this.questionRepository.find();
    return data;
  }

  async search(q: string) {
    const data = await this.questionRepository.find({
      where: { category: ILike(`%${q}%`) },
    });
    return data;
  }
  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const data = await this.questionRepository.findOne({ where: { id } });

    if (!data) {
      throw new NotFoundException(`Không tìm thấy câu hỏi`);
    }

    Object.assign(data, updateQuestionDto);

    await this.questionRepository.save(data);

    return `Sửa thành công`;
  }

  async remove(id: number) {
    const data = await this.questionRepository.findOne({
      where: { id },
    });

    if (!data) {
      throw new NotFoundException(`Không tìm thấy câu hỏi`);
    }
    await this.questionRepository.remove(data);
    return `Xoá thành công`;
  }
}
