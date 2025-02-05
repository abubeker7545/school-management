import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './course-enrollment.reducer';

export const CourseEnrollmentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const courseEnrollmentEntity = useAppSelector(state => state.courseEnrollment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="courseEnrollmentDetailsHeading">CourseEnrollment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{courseEnrollmentEntity.id}</dd>
          <dt>
            <span id="enrollmentDate">Enrollment Date</span>
          </dt>
          <dd>{courseEnrollmentEntity.enrollmentDate}</dd>
          <dt>
            <span id="completionStatus">Completion Status</span>
          </dt>
          <dd>{courseEnrollmentEntity.completionStatus ? 'true' : 'false'}</dd>
          <dt>
            <span id="progress">Progress</span>
          </dt>
          <dd>{courseEnrollmentEntity.progress}</dd>
          <dt>Student</dt>
          <dd>{courseEnrollmentEntity.student ? courseEnrollmentEntity.student.id : ''}</dd>
          <dt>Course</dt>
          <dd>{courseEnrollmentEntity.course ? courseEnrollmentEntity.course.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/course-enrollment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/course-enrollment/${courseEnrollmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CourseEnrollmentDetail;
