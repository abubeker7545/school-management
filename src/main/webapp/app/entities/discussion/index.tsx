import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Discussion from './discussion';
import DiscussionDetail from './discussion-detail';
import DiscussionUpdate from './discussion-update';
import DiscussionDeleteDialog from './discussion-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DiscussionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DiscussionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DiscussionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Discussion} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DiscussionDeleteDialog} />
  </>
);

export default Routes;
