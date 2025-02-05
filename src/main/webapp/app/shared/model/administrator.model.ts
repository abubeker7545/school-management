import { IPerson } from 'app/shared/model/person.model';
import { ISchool } from 'app/shared/model/school.model';
import { IAdministrativeBoard } from 'app/shared/model/administrative-board.model';

export interface IAdministrator {
  id?: number;
  name?: string;
  email?: string;
  person?: IPerson | null;
  school?: ISchool | null;
  boards?: IAdministrativeBoard[] | null;
}

export const defaultValue: Readonly<IAdministrator> = {};
