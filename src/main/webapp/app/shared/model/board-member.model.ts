import { IAdministrativeBoard } from 'app/shared/model/administrative-board.model';

export interface IBoardMember {
  id?: number;
  memberName?: string;
  position?: string;
  joiningDate?: string;
  board?: IAdministrativeBoard | null;
}

export const defaultValue: Readonly<IBoardMember> = {};
