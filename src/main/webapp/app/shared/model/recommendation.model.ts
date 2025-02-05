import { IStudent } from 'app/shared/model/student.model';
import { ITeacher } from 'app/shared/model/teacher.model';

export interface IRecommendation {
  id?: number;
  recommendedCourses?: string | null;
  recommendedResources?: string | null;
  student?: IStudent | null;
  teacher?: ITeacher | null;
}

export const defaultValue: Readonly<IRecommendation> = {};
