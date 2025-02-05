import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './analytics.reducer';

export const AnalyticsDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const analyticsEntity = useAppSelector(state => state.analytics.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="analyticsDetailsHeading">Analytics</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{analyticsEntity.id}</dd>
          <dt>
            <span id="totalCoursesCompleted">Total Courses Completed</span>
          </dt>
          <dd>{analyticsEntity.totalCoursesCompleted}</dd>
          <dt>
            <span id="totalAssignmentsSubmitted">Total Assignments Submitted</span>
          </dt>
          <dd>{analyticsEntity.totalAssignmentsSubmitted}</dd>
          <dt>
            <span id="attendanceRate">Attendance Rate</span>
          </dt>
          <dd>{analyticsEntity.attendanceRate}</dd>
          <dt>
            <span id="averageGrade">Average Grade</span>
          </dt>
          <dd>{analyticsEntity.averageGrade}</dd>
          <dt>Student</dt>
          <dd>{analyticsEntity.student ? analyticsEntity.student.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/analytics" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/analytics/${analyticsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AnalyticsDetail;
