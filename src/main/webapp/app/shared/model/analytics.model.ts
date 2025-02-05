import { IStudent } from 'app/shared/model/student.model';

export interface IAnalytics {
  id?: number;
  totalCoursesCompleted?: number;
  totalAssignmentsSubmitted?: number;
  attendanceRate?: number;
  averageGrade?: number | null;
  student?: IStudent | null;
}

export const defaultValue: Readonly<IAnalytics> = {};
