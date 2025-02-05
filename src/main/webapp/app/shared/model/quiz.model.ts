import { IQuestion } from 'app/shared/model/question.model';
import { ILesson } from 'app/shared/model/lesson.model';
import { ISubmission } from 'app/shared/model/submission.model';

export interface IQuiz {
  id?: number;
  title?: string;
  totalQuestions?: number;
  maxScore?: number;
  questions?: IQuestion[] | null;
  lesson?: ILesson | null;
  submissions?: ISubmission[] | null;
}

export const defaultValue: Readonly<IQuiz> = {};
