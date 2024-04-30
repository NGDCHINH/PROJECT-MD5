import { QuizEntity } from 'src/modules/quizs/entities/quiz.entity';
import { ScoreEntity } from 'src/modules/score/entities/score.entity';
import { Column, PrimaryGeneratedColumn, OneToMany, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  username: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
  @Column({ default: '' })
  avatar: string;
  @Column({ type: 'tinyint', default: 0 })
  roles: number;
  @OneToMany(() => ScoreEntity, (score) => score.user)
  scores: ScoreEntity[];
  @OneToMany(() => QuizEntity, (quiz) => quiz.examier)
  quizzes: QuizEntity[];
}
