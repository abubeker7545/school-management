import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AdministrativeBoard from './administrative-board';
import AdministrativeBoardDetail from './administrative-board-detail';
import AdministrativeBoardUpdate from './administrative-board-update';
import AdministrativeBoardDeleteDialog from './administrative-board-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AdministrativeBoardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AdministrativeBoardUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AdministrativeBoardDetail} />
      <ErrorBoundaryRoute path={match.url} component={AdministrativeBoard} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={AdministrativeBoardDeleteDialog} />
  </>
);

export default Routes;
