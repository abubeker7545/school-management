import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './administrative-board.reducer';

export const AdministrativeBoardDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const administrativeBoardEntity = useAppSelector(state => state.administrativeBoard.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="administrativeBoardDetailsHeading">AdministrativeBoard</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{administrativeBoardEntity.id}</dd>
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{administrativeBoardEntity.name}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{administrativeBoardEntity.description}</dd>
          <dt>
            <span id="creationDate">Creation Date</span>
          </dt>
          <dd>{administrativeBoardEntity.creationDate}</dd>
          <dt>
            <span id="boardHead">Board Head</span>
          </dt>
          <dd>{administrativeBoardEntity.boardHead}</dd>
          <dt>Administrators</dt>
          <dd>
            {administrativeBoardEntity.administrators
              ? administrativeBoardEntity.administrators.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {administrativeBoardEntity.administrators && i === administrativeBoardEntity.administrators.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/administrative-board" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/administrative-board/${administrativeBoardEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AdministrativeBoardDetail;
