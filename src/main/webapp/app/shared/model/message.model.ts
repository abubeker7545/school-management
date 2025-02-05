import { IStudent } from 'app/shared/model/student.model';
import { ITeacher } from 'app/shared/model/teacher.model';

export interface IMessage {
  id?: number;
  content?: string;
  timestamp?: string;
  sender?: string;
  receiver?: string;
  student?: IStudent | null;
  teacher?: ITeacher | null;
}

export const defaultValue: Readonly<IMessage> = {};
