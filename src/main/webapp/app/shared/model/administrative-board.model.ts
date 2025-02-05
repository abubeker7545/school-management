import { IBoardMember } from 'app/shared/model/board-member.model';
import { IAdministrator } from 'app/shared/model/administrator.model';

export interface IAdministrativeBoard {
  id?: number;
  name?: string;
  description?: string | null;
  creationDate?: string;
  boardHead?: string | null;
  members?: IBoardMember[] | null;
  administrators?: IAdministrator[] | null;
}

export const defaultValue: Readonly<IAdministrativeBoard> = {};
