import { IInvoice } from 'app/shared/model/invoice.model';
import { IBranch } from 'app/shared/model/branch.model';

export interface IPayment {
  id?: number;
  paymentDate?: string;
  amount?: number;
  method?: string;
  description?: string | null;
  status?: string;
  transactionId?: string | null;
  invoice?: IInvoice | null;
  branch?: IBranch | null;
}

export const defaultValue: Readonly<IPayment> = {};
