import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAnalytics } from 'app/shared/model/analytics.model';
import { getEntities } from './analytics.reducer';

export const Analytics = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const analyticsList = useAppSelector(state => state.analytics.entities);
  const loading = useAppSelector(state => state.analytics.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="analytics-heading" data-cy="AnalyticsHeading">
        Analytics
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/analytics/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Analytics
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {analyticsList && analyticsList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Total Courses Completed</th>
                <th>Total Assignments Submitted</th>
                <th>Attendance Rate</th>
                <th>Average Grade</th>
                <th>Student</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {analyticsList.map((analytics, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/analytics/${analytics.id}`} color="link" size="sm">
                      {analytics.id}
                    </Button>
                  </td>
                  <td>{analytics.totalCoursesCompleted}</td>
                  <td>{analytics.totalAssignmentsSubmitted}</td>
                  <td>{analytics.attendanceRate}</td>
                  <td>{analytics.averageGrade}</td>
                  <td>{analytics.student ? <Link to={`/student/${analytics.student.id}`}>{analytics.student.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/analytics/${analytics.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/analytics/${analytics.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/analytics/${analytics.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Analytics found</div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
