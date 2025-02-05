import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProgressReport from './progress-report';
import ProgressReportDetail from './progress-report-detail';
import ProgressReportUpdate from './progress-report-update';
import ProgressReportDeleteDialog from './progress-report-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProgressReportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProgressReportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProgressReportDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProgressReport} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ProgressReportDeleteDialog} />
  </>
);

export default Routes;
