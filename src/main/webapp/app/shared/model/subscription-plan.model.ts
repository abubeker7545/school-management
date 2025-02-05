import { ISubscriptionDSet } from 'app/shared/model/subscription-d-set.model';

export interface ISubscriptionPlan {
  id?: number;
  planName?: string;
  price?: number;
  durationMonths?: number;
  description?: string | null;
  subscriptions?: ISubscriptionDSet | null;
}

export const defaultValue: Readonly<ISubscriptionPlan> = {};
