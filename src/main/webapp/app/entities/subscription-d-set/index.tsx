import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SubscriptionDSet from './subscription-d-set';
import SubscriptionDSetDetail from './subscription-d-set-detail';
import SubscriptionDSetUpdate from './subscription-d-set-update';
import SubscriptionDSetDeleteDialog from './subscription-d-set-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SubscriptionDSetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SubscriptionDSetUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SubscriptionDSetDetail} />
      <ErrorBoundaryRoute path={match.url} component={SubscriptionDSet} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SubscriptionDSetDeleteDialog} />
  </>
);

export default Routes;
