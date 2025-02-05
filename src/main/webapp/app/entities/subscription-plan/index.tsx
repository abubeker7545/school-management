import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SubscriptionPlan from './subscription-plan';
import SubscriptionPlanDetail from './subscription-plan-detail';
import SubscriptionPlanUpdate from './subscription-plan-update';
import SubscriptionPlanDeleteDialog from './subscription-plan-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubscriptionPlanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubscriptionPlanUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubscriptionPlanDetail} />
      <ErrorBoundaryRoute path={match.url} component={SubscriptionPlan} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SubscriptionPlanDeleteDialog} />
  </>
);

export default Routes;
