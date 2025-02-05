import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './teacher.reducer';

export const TeacherDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const teacherEntity = useAppSelector(state => state.teacher.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="teacherDetailsHeading">Teacher</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{teacherEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{teacherEntity.name}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{teacherEntity.email}</dd>
          <dt>
            <span id="specialization">Specialization</span>
          </dt>
          <dd>{teacherEntity.specialization}</dd>
          <dt>
            <span id="hoursPerWeek">Hours Per Week</span>
          </dt>
          <dd>{teacherEntity.hoursPerWeek}</dd>
          <dt>
            <span id="maxHoursPerWeek">Max Hours Per Week</span>
          </dt>
          <dd>{teacherEntity.maxHoursPerWeek}</dd>
          <dt>
            <span id="bio">Bio</span>
          </dt>
          <dd>{teacherEntity.bio}</dd>
          <dt>
            <span id="profilePicture">Profile Picture</span>
          </dt>
          <dd>{teacherEntity.profilePicture}</dd>
          <dt>Person</dt>
          <dd>{teacherEntity.person ? teacherEntity.person.id : ''}</dd>
          <dt>School</dt>
          <dd>{teacherEntity.school ? teacherEntity.school.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/teacher" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/teacher/${teacherEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default TeacherDetail;
