import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './school.reducer';

export const SchoolDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const schoolEntity = useAppSelector(state => state.school.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="schoolDetailsHeading">School</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{schoolEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{schoolEntity.name}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{schoolEntity.address}</dd>
          <dt>
            <span id="establishedDate">Established Date</span>
          </dt>
          <dd>{schoolEntity.establishedDate}</dd>
          <dt>
            <span id="contactEmail">Contact Email</span>
          </dt>
          <dd>{schoolEntity.contactEmail}</dd>
        </dl>
        <Button tag={Link} to="/school" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/school/${schoolEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SchoolDetail;
