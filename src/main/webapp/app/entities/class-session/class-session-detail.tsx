import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './class-session.reducer';

export const ClassSessionDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const classSessionEntity = useAppSelector(state => state.classSession.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="classSessionDetailsHeading">ClassSession</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{classSessionEntity.id}</dd>
          <dt>
            <span id="gradeLevel">Grade Level</span>
          </dt>
          <dd>{classSessionEntity.gradeLevel}</dd>
          <dt>
            <span id="dayOfWeek">Day Of Week</span>
          </dt>
          <dd>{classSessionEntity.dayOfWeek}</dd>
          <dt>
            <span id="startTime">Start Time</span>
          </dt>
          <dd>{classSessionEntity.startTime}</dd>
          <dt>
            <span id="endTime">End Time</span>
          </dt>
          <dd>{classSessionEntity.endTime}</dd>
          <dt>Subject</dt>
          <dd>{classSessionEntity.subject ? classSessionEntity.subject.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/class-session" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/class-session/${classSessionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClassSessionDetail;
