import { QuestionEntity } from 'src/modules/questions/entities/question.entity';
import { Column, PrimaryGeneratedColumn, ManyToOne, Entity } from 'typeorm';
@Entity({ name: 'answers' })
export class AnswerEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  answertext: string;
  @Column()
  isCorrect: boolean;
  @ManyToOne(() => QuestionEntity, (question) => question.id)
  question: QuestionEntity;
}
