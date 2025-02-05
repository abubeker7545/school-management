import { IStudent } from 'app/shared/model/student.model';

export interface IProgressReport {
  id?: number;
  reportDate?: string;
  progress?: number;
  notes?: string | null;
  student?: IStudent | null;
}

export const defaultValue: Readonly<IProgressReport> = {};
