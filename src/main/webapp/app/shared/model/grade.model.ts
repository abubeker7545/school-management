import { IStudent } from 'app/shared/model/student.model';
import { IExam } from 'app/shared/model/exam.model';

export interface IGrade {
  id?: number;
  score?: number;
  comments?: string | null;
  student?: IStudent | null;
  exam?: IExam | null;
}

export const defaultValue: Readonly<IGrade> = {};
