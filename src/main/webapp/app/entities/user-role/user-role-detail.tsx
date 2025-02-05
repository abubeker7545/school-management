import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './user-role.reducer';

export const UserRoleDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const userRoleEntity = useAppSelector(state => state.userRole.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userRoleDetailsHeading">UserRole</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{userRoleEntity.id}</dd>
          <dt>
            <span id="assignedDate">Assigned Date</span>
          </dt>
          <dd>{userRoleEntity.assignedDate}</dd>
          <dt>Person</dt>
          <dd>
            {userRoleEntity.people
              ? userRoleEntity.people.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {userRoleEntity.people && i === userRoleEntity.people.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
          <dt>Role</dt>
          <dd>
            {userRoleEntity.roles
              ? userRoleEntity.roles.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {userRoleEntity.roles && i === userRoleEntity.roles.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/user-role" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-role/${userRoleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserRoleDetail;
