import { IComment } from 'app/shared/model/comment.model';
import { ILesson } from 'app/shared/model/lesson.model';

export interface IDiscussion {
  id?: number;
  title?: string;
  creationDate?: string;
  isClosed?: boolean;
  comments?: IComment[] | null;
  lesson?: ILesson | null;
}

export const defaultValue: Readonly<IDiscussion> = {
  isClosed: false,
};
