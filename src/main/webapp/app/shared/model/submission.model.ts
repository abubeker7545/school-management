import { IStudent } from 'app/shared/model/student.model';
import { IAssignment } from 'app/shared/model/assignment.model';
import { IQuiz } from 'app/shared/model/quiz.model';

export interface ISubmission {
  id?: number;
  submissionDate?: string;
  grade?: number | null;
  feedback?: string | null;
  student?: IStudent | null;
  assignment?: IAssignment | null;
  quiz?: IQuiz | null;
}

export const defaultValue: Readonly<ISubmission> = {};
