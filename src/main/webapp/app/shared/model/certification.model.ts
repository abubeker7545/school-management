import { ICourse } from 'app/shared/model/course.model';

export interface ICertification {
  id?: number;
  certificateName?: string;
  issueDate?: string;
  expirationDate?: string | null;
  certificationUrl?: string | null;
  course?: ICourse | null;
}

export const defaultValue: Readonly<ICertification> = {};
