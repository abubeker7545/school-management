import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IQuiz } from 'app/shared/model/quiz.model';
import { getEntities } from './quiz.reducer';

export const Quiz = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const quizList = useAppSelector(state => state.quiz.entities);
  const loading = useAppSelector(state => state.quiz.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="quiz-heading" data-cy="QuizHeading">
        Quizzes
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/quiz/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Quiz
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {quizList && quizList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Total Questions</th>
                <th>Max Score</th>
                <th>Lesson</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {quizList.map((quiz, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/quiz/${quiz.id}`} color="link" size="sm">
                      {quiz.id}
                    </Button>
                  </td>
                  <td>{quiz.title}</td>
                  <td>{quiz.totalQuestions}</td>
                  <td>{quiz.maxScore}</td>
                  <td>{quiz.lesson ? <Link to={`/lesson/${quiz.lesson.id}`}>{quiz.lesson.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/quiz/${quiz.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/quiz/${quiz.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/quiz/${quiz.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Quizzes found</div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
