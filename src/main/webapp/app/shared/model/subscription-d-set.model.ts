import { IStudent } from 'app/shared/model/student.model';
import { ISubscriptionPlan } from 'app/shared/model/subscription-plan.model';

export interface ISubscriptionDSet {
  id?: number;
  startDate?: string;
  endDate?: string;
  status?: string;
  renewalDate?: string | null;
  student?: IStudent | null;
  subscriptionPlans?: ISubscriptionPlan[] | null;
}

export const defaultValue: Readonly<ISubscriptionDSet> = {};
