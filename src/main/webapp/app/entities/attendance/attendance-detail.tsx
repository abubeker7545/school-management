import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './attendance.reducer';

export const AttendanceDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const attendanceEntity = useAppSelector(state => state.attendance.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="attendanceDetailsHeading">Attendance</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{attendanceEntity.id}</dd>
          <dt>
            <span id="date">Date</span>
          </dt>
          <dd>{attendanceEntity.date}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{attendanceEntity.status ? 'true' : 'false'}</dd>
          <dt>Student</dt>
          <dd>{attendanceEntity.student ? attendanceEntity.student.id : ''}</dd>
          <dt>Class Session</dt>
          <dd>{attendanceEntity.classSession ? attendanceEntity.classSession.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/attendance" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/attendance/${attendanceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AttendanceDetail;
