import { ILesson } from 'app/shared/model/lesson.model';

export interface IResource {
  id?: number;
  title?: string;
  resourceUrl?: string;
  description?: string | null;
  lesson?: ILesson | null;
}

export const defaultValue: Readonly<IResource> = {};
