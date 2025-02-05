import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './question.reducer';

export const QuestionDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const questionEntity = useAppSelector(state => state.question.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="questionDetailsHeading">Question</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{questionEntity.id}</dd>
          <dt>
            <span id="text">Text</span>
          </dt>
          <dd>{questionEntity.text}</dd>
          <dt>
            <span id="answerOptions">Answer Options</span>
          </dt>
          <dd>{questionEntity.answerOptions}</dd>
          <dt>
            <span id="correctAnswer">Correct Answer</span>
          </dt>
          <dd>{questionEntity.correctAnswer}</dd>
          <dt>
            <span id="points">Points</span>
          </dt>
          <dd>{questionEntity.points}</dd>
          <dt>Quiz</dt>
          <dd>{questionEntity.quiz ? questionEntity.quiz.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/question" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/question/${questionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default QuestionDetail;
