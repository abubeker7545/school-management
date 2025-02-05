import { IStudent } from 'app/shared/model/student.model';
import { ICourse } from 'app/shared/model/course.model';

export interface ICourseEnrollment {
  id?: number;
  enrollmentDate?: string;
  completionStatus?: boolean;
  progress?: number | null;
  student?: IStudent | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<ICourseEnrollment> = {
  completionStatus: false,
};
