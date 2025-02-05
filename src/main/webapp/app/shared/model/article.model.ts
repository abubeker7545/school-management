import { ILesson } from 'app/shared/model/lesson.model';

export interface IArticle {
  id?: number;
  title?: string;
  content?: string;
  author?: string | null;
  lesson?: ILesson | null;
}

export const defaultValue: Readonly<IArticle> = {};
