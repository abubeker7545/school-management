import { IBranch } from 'app/shared/model/branch.model';
import { IAdministrator } from 'app/shared/model/administrator.model';
import { ITeacher } from 'app/shared/model/teacher.model';
import { IStudent } from 'app/shared/model/student.model';

export interface ISchool {
  id?: number;
  name?: string;
  address?: string | null;
  establishedDate?: string | null;
  contactEmail?: string | null;
  branches?: IBranch[] | null;
  administrators?: IAdministrator[] | null;
  teachers?: ITeacher[] | null;
  students?: IStudent[] | null;
}

export const defaultValue: Readonly<ISchool> = {};
