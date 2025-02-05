import { IExam } from 'app/shared/model/exam.model';
import { IAssignment } from 'app/shared/model/assignment.model';
import { IClassSession } from 'app/shared/model/class-session.model';
import { ITeacher } from 'app/shared/model/teacher.model';

export interface ISubject {
  id?: number;
  name?: string;
  description?: string | null;
  exams?: IExam[] | null;
  assignments?: IAssignment[] | null;
  classSessions?: IClassSession[] | null;
  teacher?: ITeacher | null;
}

export const defaultValue: Readonly<ISubject> = {};
