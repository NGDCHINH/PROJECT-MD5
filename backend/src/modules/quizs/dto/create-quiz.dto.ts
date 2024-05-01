import { IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  passingPercentage: number;
  createdBy: string;
  questionList: number[];
}
