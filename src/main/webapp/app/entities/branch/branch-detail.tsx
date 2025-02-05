import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './branch.reducer';

export const BranchDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const branchEntity = useAppSelector(state => state.branch.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="branchDetailsHeading">Branch</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{branchEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{branchEntity.name}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{branchEntity.address}</dd>
          <dt>
            <span id="contactEmail">Contact Email</span>
          </dt>
          <dd>{branchEntity.contactEmail}</dd>
          <dt>
            <span id="establishedDate">Established Date</span>
          </dt>
          <dd>{branchEntity.establishedDate}</dd>
          <dt>
            <span id="phone">Phone</span>
          </dt>
          <dd>{branchEntity.phone}</dd>
          <dt>
            <span id="manager">Manager</span>
          </dt>
          <dd>{branchEntity.manager}</dd>
          <dt>School</dt>
          <dd>{branchEntity.school ? branchEntity.school.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/branch" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/branch/${branchEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BranchDetail;
