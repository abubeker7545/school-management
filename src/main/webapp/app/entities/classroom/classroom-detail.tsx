import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './classroom.reducer';

export const ClassroomDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const classroomEntity = useAppSelector(state => state.classroom.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="classroomDetailsHeading">Classroom</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{classroomEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{classroomEntity.name}</dd>
          <dt>
            <span id="capacity">Capacity</span>
          </dt>
          <dd>{classroomEntity.capacity}</dd>
          <dt>
            <span id="location">Location</span>
          </dt>
          <dd>{classroomEntity.location}</dd>
          <dt>Class Sessions</dt>
          <dd>{classroomEntity.classSessions ? classroomEntity.classSessions.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/classroom" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/classroom/${classroomEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ClassroomDetail;
