import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILearningMaterial } from 'app/shared/model/learning-material.model';
import { getEntities } from './learning-material.reducer';

export const LearningMaterial = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const learningMaterialList = useAppSelector(state => state.learningMaterial.entities);
  const loading = useAppSelector(state => state.learningMaterial.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="learning-material-heading" data-cy="LearningMaterialHeading">
        Learning Materials
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/learning-material/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Learning Material
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {learningMaterialList && learningMaterialList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Resource Url</th>
                <th>Description</th>
                <th>Lesson</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {learningMaterialList.map((learningMaterial, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/learning-material/${learningMaterial.id}`} color="link" size="sm">
                      {learningMaterial.id}
                    </Button>
                  </td>
                  <td>{learningMaterial.title}</td>
                  <td>{learningMaterial.resourceUrl}</td>
                  <td>{learningMaterial.description}</td>
                  <td>
                    {learningMaterial.lesson ? <Link to={`/lesson/${learningMaterial.lesson.id}`}>{learningMaterial.lesson.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/learning-material/${learningMaterial.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/learning-material/${learningMaterial.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/learning-material/${learningMaterial.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Learning Materials found</div>
        )}
      </div>
    </div>
  );
};

export default LearningMaterial;
