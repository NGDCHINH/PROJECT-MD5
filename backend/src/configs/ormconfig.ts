import { QuestionEntity } from 'src/modules/questions/entities/question.entity';
import { QuizEntity } from 'src/modules/quizs/entities/quiz.entity';
import { ScoreEntity } from 'src/modules/score/entities/score.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

require('dotenv').config();
export const config: MysqlConnectionOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [UserEntity, QuizEntity, QuestionEntity, ScoreEntity],
  synchronize: true,
};
