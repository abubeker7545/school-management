import { IClassroom } from 'app/shared/model/classroom.model';
import { IAttendance } from 'app/shared/model/attendance.model';
import { ISubject } from 'app/shared/model/subject.model';

export interface IClassSession {
  id?: number;
  gradeLevel?: number;
  dayOfWeek?: number;
  startTime?: string;
  endTime?: string;
  classrooms?: IClassroom[] | null;
  attendanceRecords?: IAttendance[] | null;
  subject?: ISubject | null;
}

export const defaultValue: Readonly<IClassSession> = {};
