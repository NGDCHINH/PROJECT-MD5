import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsNotEmpty()
  questionNumber: number;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  question: string;
  @IsNotEmpty()
  options: object;
  @IsNotEmpty()
  correctOption: number;
  @IsString()
  image: string;
}
