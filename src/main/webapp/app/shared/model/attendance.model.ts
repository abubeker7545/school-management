import { IStudent } from 'app/shared/model/student.model';
import { IClassSession } from 'app/shared/model/class-session.model';

export interface IAttendance {
  id?: number;
  date?: string;
  status?: boolean;
  student?: IStudent | null;
  classSession?: IClassSession | null;
}

export const defaultValue: Readonly<IAttendance> = {
  status: false,
};
