import { ICourse } from 'app/shared/model/course.model';

export interface IAnnouncement {
  id?: number;
  title?: string;
  content?: string;
  creationDate?: string;
  course?: ICourse | null;
}

export const defaultValue: Readonly<IAnnouncement> = {};
