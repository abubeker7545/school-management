import { IUserRole } from 'app/shared/model/user-role.model';

export interface IRole {
  id?: number;
  name?: string;
  description?: string | null;
  userRoles?: IUserRole[] | null;
}

export const defaultValue: Readonly<IRole> = {};
