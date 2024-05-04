import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { QuestionEntity } from '../../questions/entities/question.entity';
import { ScoreEntity } from 'src/modules/score/entities/score.entity';

@Entity({ name: 'quiz' })
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;

  @Column({ default: '' })
  image: string;

  @Column()
  category: string;

  @Column({ default: 10 })
  maxScore: number;

  @Column()
  passingPercentage: number;

  @Column()
  createdBy: string;

  @Column({ default: false })
  isPublished: boolean;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions: QuestionEntity[];

  @OneToMany(() => ScoreEntity, (score) => score.quiz)
  scores: ScoreEntity[];
}
