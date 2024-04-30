import { QuestionEntity } from 'src/modules/questions/entities/question.entity';
import { ScoreEntity } from 'src/modules/score/entities/score.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Entity,
  ManyToOne,
} from 'typeorm';
@Entity({ name: 'quizzes' })
export class QuizEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  isPublic: boolean;
  @ManyToOne(() => UserEntity, (user) => user.quizzes)
  examier: UserEntity;

  @OneToMany(() => QuestionEntity, (question) => question.quiz)
  questions: QuestionEntity[];

  @OneToMany(() => ScoreEntity, (score) => score.quiz)
  scores: ScoreEntity[];
}
