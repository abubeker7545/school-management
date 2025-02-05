import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ClassSession from './class-session';
import ClassSessionDetail from './class-session-detail';
import ClassSessionUpdate from './class-session-update';
import ClassSessionDeleteDialog from './class-session-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClassSessionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClassSessionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClassSessionDetail} />
      <ErrorBoundaryRoute path={match.url} component={ClassSession} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ClassSessionDeleteDialog} />
  </>
);

export default Routes;
