import { ILesson } from 'app/shared/model/lesson.model';

export interface ILearningMaterial {
  id?: number;
  title?: string;
  resourceUrl?: string;
  description?: string | null;
  lesson?: ILesson | null;
}

export const defaultValue: Readonly<ILearningMaterial> = {};
