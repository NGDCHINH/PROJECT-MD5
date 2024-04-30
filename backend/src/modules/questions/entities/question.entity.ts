import { AnswerEntity } from 'src/modules/answers/entities/answer.entity';
import { QuizEntity } from 'src/modules/quizs/entities/quiz.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
  ManyToOne,
} from 'typeorm';
@Entity({ name: 'questions' })
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions)
  quiz: QuizEntity;
  @OneToMany(() => AnswerEntity, (answer) => answer.id)
  answers: AnswerEntity[];
}
