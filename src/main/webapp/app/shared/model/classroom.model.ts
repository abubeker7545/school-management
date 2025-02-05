import { IClassSession } from 'app/shared/model/class-session.model';

export interface IClassroom {
  id?: number;
  name?: string;
  capacity?: number;
  location?: string | null;
  classSessions?: IClassSession | null;
}

export const defaultValue: Readonly<IClassroom> = {};
