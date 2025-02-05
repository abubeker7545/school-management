import { IStudent } from 'app/shared/model/student.model';
import { IDiscussion } from 'app/shared/model/discussion.model';

export interface IComment {
  id?: number;
  content?: string;
  creationDate?: string;
  author?: string;
  student?: IStudent | null;
  discussion?: IDiscussion | null;
}

export const defaultValue: Readonly<IComment> = {};
