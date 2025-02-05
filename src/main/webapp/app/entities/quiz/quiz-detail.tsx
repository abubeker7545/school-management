import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './quiz.reducer';

export const QuizDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const quizEntity = useAppSelector(state => state.quiz.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="quizDetailsHeading">Quiz</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{quizEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{quizEntity.title}</dd>
          <dt>
            <span id="totalQuestions">Total Questions</span>
          </dt>
          <dd>{quizEntity.totalQuestions}</dd>
          <dt>
            <span id="maxScore">Max Score</span>
          </dt>
          <dd>{quizEntity.maxScore}</dd>
          <dt>Lesson</dt>
          <dd>{quizEntity.lesson ? quizEntity.lesson.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/quiz" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/quiz/${quizEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default QuizDetail;
