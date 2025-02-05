import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './administrator.reducer';

export const AdministratorDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const administratorEntity = useAppSelector(state => state.administrator.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="administratorDetailsHeading">Administrator</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{administratorEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{administratorEntity.name}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{administratorEntity.email}</dd>
          <dt>Person</dt>
          <dd>{administratorEntity.person ? administratorEntity.person.id : ''}</dd>
          <dt>School</dt>
          <dd>{administratorEntity.school ? administratorEntity.school.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/administrator" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/administrator/${administratorEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AdministratorDetail;
