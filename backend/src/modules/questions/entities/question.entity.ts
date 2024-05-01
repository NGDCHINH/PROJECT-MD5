import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { QuizEntity } from '../../quizs/entities/quiz.entity';

@Entity({ name: 'questions' })
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column()
  question: string;

  @Column({ nullable: true })
  image: string;

  @Column('json', { nullable: true })
  options: object;

  @Column({ default: null })
  correctOption: number;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.questions)
  quiz: QuizEntity;
}
