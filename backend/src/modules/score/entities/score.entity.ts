// report.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';
import { QuizEntity } from '../../quizs/entities/quiz.entity';
@Entity({ name: 'score' })
export class ScoreEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  score: number;

  @Column()
  total: number;

  @Column()
  percentage: number;

  @Column()
  result: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.scores)
  user: UserEntity;

  @ManyToOne(() => QuizEntity, (quiz) => quiz.score)
  quiz: QuizEntity;
}
