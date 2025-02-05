import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RoleAssignment from './role-assignment';
import RoleAssignmentDetail from './role-assignment-detail';
import RoleAssignmentUpdate from './role-assignment-update';
import RoleAssignmentDeleteDialog from './role-assignment-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RoleAssignmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RoleAssignmentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RoleAssignmentDetail} />
      <ErrorBoundaryRoute path={match.url} component={RoleAssignment} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RoleAssignmentDeleteDialog} />
  </>
);

export default Routes;
