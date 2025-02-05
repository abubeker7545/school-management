import { IStudent } from 'app/shared/model/student.model';
import { ITeacher } from 'app/shared/model/teacher.model';

export interface INotification {
  id?: number;
  content?: string;
  dateSent?: string;
  isRead?: boolean;
  student?: IStudent | null;
  teacher?: ITeacher | null;
}

export const defaultValue: Readonly<INotification> = {
  isRead: false,
};
