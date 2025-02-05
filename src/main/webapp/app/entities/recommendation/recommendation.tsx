import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IRecommendation } from 'app/shared/model/recommendation.model';
import { getEntities } from './recommendation.reducer';

export const Recommendation = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const recommendationList = useAppSelector(state => state.recommendation.entities);
  const loading = useAppSelector(state => state.recommendation.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="recommendation-heading" data-cy="RecommendationHeading">
        Recommendations
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/recommendation/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Recommendation
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {recommendationList && recommendationList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Recommended Courses</th>
                <th>Recommended Resources</th>
                <th>Student</th>
                <th>Teacher</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {recommendationList.map((recommendation, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/recommendation/${recommendation.id}`} color="link" size="sm">
                      {recommendation.id}
                    </Button>
                  </td>
                  <td>{recommendation.recommendedCourses}</td>
                  <td>{recommendation.recommendedResources}</td>
                  <td>
                    {recommendation.student ? <Link to={`/student/${recommendation.student.id}`}>{recommendation.student.id}</Link> : ''}
                  </td>
                  <td>
                    {recommendation.teacher ? <Link to={`/teacher/${recommendation.teacher.id}`}>{recommendation.teacher.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/recommendation/${recommendation.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/recommendation/${recommendation.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/recommendation/${recommendation.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Recommendations found</div>
        )}
      </div>
    </div>
  );
};

export default Recommendation;
