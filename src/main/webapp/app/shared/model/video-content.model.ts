import { ILesson } from 'app/shared/model/lesson.model';

export interface IVideoContent {
  id?: number;
  title?: string;
  videoUrl?: string;
  duration?: number;
  lesson?: ILesson | null;
}

export const defaultValue: Readonly<IVideoContent> = {};
