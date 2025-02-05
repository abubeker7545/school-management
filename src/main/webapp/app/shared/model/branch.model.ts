import { IPayment } from 'app/shared/model/payment.model';
import { IInvoice } from 'app/shared/model/invoice.model';
import { ISchool } from 'app/shared/model/school.model';

export interface IBranch {
  id?: number;
  name?: string;
  address?: string | null;
  contactEmail?: string;
  establishedDate?: string | null;
  phone?: string | null;
  manager?: string | null;
  payments?: IPayment[] | null;
  invoices?: IInvoice[] | null;
  school?: ISchool | null;
}

export const defaultValue: Readonly<IBranch> = {};
