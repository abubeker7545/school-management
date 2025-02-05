import { IBranch } from 'app/shared/model/branch.model';
import { IPayment } from 'app/shared/model/payment.model';

export interface IInvoice {
  id?: number;
  invoiceDate?: string;
  dueDate?: string;
  totalAmount?: number;
  status?: string;
  branch?: IBranch | null;
  payments?: IPayment[] | null;
}

export const defaultValue: Readonly<IInvoice> = {};
