import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LiveSession from './live-session';
import LiveSessionDetail from './live-session-detail';
import LiveSessionUpdate from './live-session-update';
import LiveSessionDeleteDialog from './live-session-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LiveSessionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LiveSessionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LiveSessionDetail} />
      <ErrorBoundaryRoute path={match.url} component={LiveSession} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LiveSessionDeleteDialog} />
  </>
);

export default Routes;
