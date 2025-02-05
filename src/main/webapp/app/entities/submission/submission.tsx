import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISubmission } from 'app/shared/model/submission.model';
import { getEntities } from './submission.reducer';

export const Submission = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const submissionList = useAppSelector(state => state.submission.entities);
  const loading = useAppSelector(state => state.submission.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="submission-heading" data-cy="SubmissionHeading">
        Submissions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/submission/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Submission
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {submissionList && submissionList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Submission Date</th>
                <th>Grade</th>
                <th>Feedback</th>
                <th>Student</th>
                <th>Assignment</th>
                <th>Quiz</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {submissionList.map((submission, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/submission/${submission.id}`} color="link" size="sm">
                      {submission.id}
                    </Button>
                  </td>
                  <td>{submission.submissionDate}</td>
                  <td>{submission.grade}</td>
                  <td>{submission.feedback}</td>
                  <td>{submission.student ? <Link to={`/student/${submission.student.id}`}>{submission.student.id}</Link> : ''}</td>
                  <td>
                    {submission.assignment ? <Link to={`/assignment/${submission.assignment.id}`}>{submission.assignment.id}</Link> : ''}
                  </td>
                  <td>{submission.quiz ? <Link to={`/quiz/${submission.quiz.id}`}>{submission.quiz.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/submission/${submission.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/submission/${submission.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/submission/${submission.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Submissions found</div>
        )}
      </div>
    </div>
  );
};

export default Submission;
