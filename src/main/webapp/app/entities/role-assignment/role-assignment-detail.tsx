import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './role-assignment.reducer';

export const RoleAssignmentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const roleAssignmentEntity = useAppSelector(state => state.roleAssignment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="roleAssignmentDetailsHeading">RoleAssignment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{roleAssignmentEntity.id}</dd>
          <dt>
            <span id="roleType">Role Type</span>
          </dt>
          <dd>{roleAssignmentEntity.roleType}</dd>
          <dt>
            <span id="effectiveDate">Effective Date</span>
          </dt>
          <dd>{roleAssignmentEntity.effectiveDate}</dd>
          <dt>
            <span id="expirationDate">Expiration Date</span>
          </dt>
          <dd>{roleAssignmentEntity.expirationDate}</dd>
        </dl>
        <Button tag={Link} to="/role-assignment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/role-assignment/${roleAssignmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default RoleAssignmentDetail;
