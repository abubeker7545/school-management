import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Certification from './certification';
import CertificationDetail from './certification-detail';
import CertificationUpdate from './certification-update';
import CertificationDeleteDialog from './certification-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CertificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CertificationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CertificationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Certification} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CertificationDeleteDialog} />
  </>
);

export default Routes;
