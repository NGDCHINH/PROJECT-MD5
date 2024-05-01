import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionEntity } from './entities/question.entity';
import { Repository } from 'typeorm';
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
    question.questionNumber = createQuestionDto.questionNumber;
    question.category = createQuestionDto.category;
    question.question = createQuestionDto.question;
    question.options = createQuestionDto.options;
    question.correctOption = createQuestionDto.correctOption;

    // Initialize Firebase Admin SDK
    try {
      const serviceAccount = require(process.env.FIREBASE_ACCOUNT_KEY);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: process.env.FIREBASE_URL,
      });
    } catch (error) {
      console.error('Error initializing Firebase:', error);
      process.exit(1);
    }

    // Download and save the image
    if (createQuestionDto.image) {
      try {
        const imageUrl = createQuestionDto.image;
        const imageName = path.basename(imageUrl);
        const imageDir = path.join(__dirname, '..', '..', 'shared', 'image');
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

  // async create(createQuestionDto: CreateQuestionDto) {
  //   const question = new QuestionEntity();
  //   question.questionNumber = createQuestionDto.questionNumber;
  //   question.category = createQuestionDto.category;
  //   question.question = createQuestionDto.question;
  //   question.options = createQuestionDto.options;
  //   question.correctOption = createQuestionDto.correctOption;

  //   // Download and save the image
  //   if (createQuestionDto.image) {
  //     try {
  //       const imagePath = await this.downloadImage(createQuestionDto.image);
  //       question.image = imagePath;
  //     } catch (error) {
  //       throw new HttpException(
  //         'Failed to download image',
  //         HttpStatus.INTERNAL_SERVER_ERROR,
  //       );
  //     }
  //   }
  //   return this.questionRepository.save(question);
  // }

  // async downloadImage(imageUrl: string): Promise<string> {
  //   const imageName = path.basename(imageUrl);
  //   const imageDir = path.join(__dirname, '..', '..', 'shared', 'image');
  //   const imagePath = path.join(imageDir, imageName);

  //   if (!fs.existsSync(imageDir)) {
  //     fs.mkdirSync(imageDir, { recursive: true });
  //   }

  //   const response = await axios({
  //     method: 'GET',
  //     url: imageUrl,
  //     responseType: 'stream',
  //   });

  //   response.data.pipe(fs.createWriteStream(imagePath));

  //   return new Promise((resolve, reject) => {
  //     response.data.on('end', () => resolve(imagePath));
  //     response.data.on('error', () => reject('Failed to download image'));
  //   });
  // }

  findAll() {
    return `This action returns all questions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} question`;
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
