import { IQuiz } from 'app/shared/model/quiz.model';

export interface IQuestion {
  id?: number;
  text?: string;
  answerOptions?: string;
  correctAnswer?: string;
  points?: number;
  quiz?: IQuiz | null;
}

export const defaultValue: Readonly<IQuestion> = {};
