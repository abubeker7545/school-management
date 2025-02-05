import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './submission.reducer';

export const SubmissionDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const submissionEntity = useAppSelector(state => state.submission.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="submissionDetailsHeading">Submission</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{submissionEntity.id}</dd>
          <dt>
            <span id="submissionDate">Submission Date</span>
          </dt>
          <dd>{submissionEntity.submissionDate}</dd>
          <dt>
            <span id="grade">Grade</span>
          </dt>
          <dd>{submissionEntity.grade}</dd>
          <dt>
            <span id="feedback">Feedback</span>
          </dt>
          <dd>{submissionEntity.feedback}</dd>
          <dt>Student</dt>
          <dd>{submissionEntity.student ? submissionEntity.student.id : ''}</dd>
          <dt>Assignment</dt>
          <dd>{submissionEntity.assignment ? submissionEntity.assignment.id : ''}</dd>
          <dt>Quiz</dt>
          <dd>{submissionEntity.quiz ? submissionEntity.quiz.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/submission" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/submission/${submissionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SubmissionDetail;
