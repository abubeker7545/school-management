import { ISubject } from 'app/shared/model/subject.model';
import { ISubmission } from 'app/shared/model/submission.model';

export interface IAssignment {
  id?: number;
  title?: string;
  dueDate?: string;
  description?: string | null;
  subject?: ISubject | null;
  submissions?: ISubmission[] | null;
}

export const defaultValue: Readonly<IAssignment> = {};
