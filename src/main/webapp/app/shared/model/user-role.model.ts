import { IPerson } from 'app/shared/model/person.model';
import { IRole } from 'app/shared/model/role.model';

export interface IUserRole {
  id?: number;
  assignedDate?: string | null;
  people?: IPerson[] | null;
  roles?: IRole[] | null;
}

export const defaultValue: Readonly<IUserRole> = {};
