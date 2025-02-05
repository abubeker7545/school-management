import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Attendance from './attendance';
import AttendanceDetail from './attendance-detail';
import AttendanceUpdate from './attendance-update';
import AttendanceDeleteDialog from './attendance-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AttendanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AttendanceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AttendanceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Attendance} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AttendanceDeleteDialog} />
  </>
);

export default Routes;
