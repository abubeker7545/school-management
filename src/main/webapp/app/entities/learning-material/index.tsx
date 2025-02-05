import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LearningMaterial from './learning-material';
import LearningMaterialDetail from './learning-material-detail';
import LearningMaterialUpdate from './learning-material-update';
import LearningMaterialDeleteDialog from './learning-material-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={LearningMaterialUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={LearningMaterialUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={LearningMaterialDetail} />
      <ErrorBoundaryRoute path={match.url} component={LearningMaterial} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={LearningMaterialDeleteDialog} />
  </>
);

export default Routes;
