import { IStudent } from 'app/shared/model/student.model';
import { ITeacher } from 'app/shared/model/teacher.model';
import { IAdministrator } from 'app/shared/model/administrator.model';
import { IUserRole } from 'app/shared/model/user-role.model';

export interface IPerson {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  token?: string | null;
  profilePicture?: string | null;
  bio?: string | null;
  student?: IStudent | null;
  teacher?: ITeacher | null;
  administrator?: IAdministrator | null;
  userRoles?: IUserRole[] | null;
}

export const defaultValue: Readonly<IPerson> = {};
