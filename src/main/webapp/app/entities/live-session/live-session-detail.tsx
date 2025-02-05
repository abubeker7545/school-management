import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './live-session.reducer';

export const LiveSessionDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const liveSessionEntity = useAppSelector(state => state.liveSession.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="liveSessionDetailsHeading">LiveSession</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{liveSessionEntity.id}</dd>
          <dt>
            <span id="sessionTitle">Session Title</span>
          </dt>
          <dd>{liveSessionEntity.sessionTitle}</dd>
          <dt>
            <span id="sessionDate">Session Date</span>
          </dt>
          <dd>{liveSessionEntity.sessionDate}</dd>
          <dt>
            <span id="duration">Duration</span>
          </dt>
          <dd>{liveSessionEntity.duration}</dd>
          <dt>
            <span id="meetingLink">Meeting Link</span>
          </dt>
          <dd>{liveSessionEntity.meetingLink}</dd>
          <dt>Course</dt>
          <dd>{liveSessionEntity.course ? liveSessionEntity.course.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/live-session" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/live-session/${liveSessionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LiveSessionDetail;
