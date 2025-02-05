import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './assignment.reducer';

export const AssignmentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const assignmentEntity = useAppSelector(state => state.assignment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assignmentDetailsHeading">Assignment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{assignmentEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{assignmentEntity.title}</dd>
          <dt>
            <span id="dueDate">Due Date</span>
          </dt>
          <dd>{assignmentEntity.dueDate}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{assignmentEntity.description}</dd>
          <dt>Subject</dt>
          <dd>{assignmentEntity.subject ? assignmentEntity.subject.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/assignment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/assignment/${assignmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssignmentDetail;
