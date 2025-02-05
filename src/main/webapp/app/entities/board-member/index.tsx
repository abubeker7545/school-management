import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import BoardMember from './board-member';
import BoardMemberDetail from './board-member-detail';
import BoardMemberUpdate from './board-member-update';
import BoardMemberDeleteDialog from './board-member-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BoardMemberUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BoardMemberUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BoardMemberDetail} />
      <ErrorBoundaryRoute path={match.url} component={BoardMember} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={BoardMemberDeleteDialog} />
  </>
);

export default Routes;
