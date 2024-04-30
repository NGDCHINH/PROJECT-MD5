import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionEntity } from '../../questions/entities/question.entity';
import { ScoreEntity } from 'src/modules/score/entities/score.entity';

@Entity({ name: 'quiz' })
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  category: string;

  @Column()
  passingPercentage: number;

  @Column()
  createdBy: number;

  @Column({ nullable: true })
  attemptsAllowedPerUser: number;

  @Column({ default: false })
  isPublished: boolean;

  @Column()
  isPublicQuiz: boolean;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questionList: QuestionEntity[];
  @OneToMany(() => ScoreEntity, (score) => score.quiz)
  score: ScoreEntity[];
}
