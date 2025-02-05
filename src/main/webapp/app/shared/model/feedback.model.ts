import { ICourse } from 'app/shared/model/course.model';
import { ITeacher } from 'app/shared/model/teacher.model';

export interface IFeedback {
  id?: number;
  content?: string;
  creationDate?: string;
  rating?: number;
  course?: ICourse | null;
  teacher?: ITeacher | null;
}

export const defaultValue: Readonly<IFeedback> = {};
