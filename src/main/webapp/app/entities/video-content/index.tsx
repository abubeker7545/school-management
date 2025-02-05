import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import VideoContent from './video-content';
import VideoContentDetail from './video-content-detail';
import VideoContentUpdate from './video-content-update';
import VideoContentDeleteDialog from './video-content-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={VideoContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={VideoContentUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={VideoContentDetail} />
      <ErrorBoundaryRoute path={match.url} component={VideoContent} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={VideoContentDeleteDialog} />
  </>
);

export default Routes;
