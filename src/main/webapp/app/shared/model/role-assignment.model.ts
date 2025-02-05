export interface IRoleAssignment {
  id?: number;
  roleType?: string;
  effectiveDate?: string;
  expirationDate?: string | null;
}

export const defaultValue: Readonly<IRoleAssignment> = {};
