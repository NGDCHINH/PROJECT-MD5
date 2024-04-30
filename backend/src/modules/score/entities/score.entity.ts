import { QuizEntity } from 'src/modules/quizs/entities/quiz.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'scores' })
export class ScoreEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  score: number;
  @ManyToOne(() => UserEntity, (user) => user.scores)
  user: UserEntity;
  @ManyToOne(() => QuizEntity, (quiz) => quiz.scores)
  quiz: QuizEntity;
}
