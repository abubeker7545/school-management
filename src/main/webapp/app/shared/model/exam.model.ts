import { IGrade } from 'app/shared/model/grade.model';
import { ISubject } from 'app/shared/model/subject.model';

export interface IExam {
  id?: number;
  title?: string;
  date?: string;
  maxScore?: number;
  grades?: IGrade[] | null;
  subject?: ISubject | null;
}

export const defaultValue: Readonly<IExam> = {};
