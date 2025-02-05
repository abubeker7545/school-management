import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IFeedback } from 'app/shared/model/feedback.model';
import { getEntities } from './feedback.reducer';

export const Feedback = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const feedbackList = useAppSelector(state => state.feedback.entities);
  const loading = useAppSelector(state => state.feedback.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="feedback-heading" data-cy="FeedbackHeading">
        Feedbacks
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/feedback/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Feedback
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {feedbackList && feedbackList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Content</th>
                <th>Creation Date</th>
                <th>Rating</th>
                <th>Course</th>
                <th>Teacher</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((feedback, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/feedback/${feedback.id}`} color="link" size="sm">
                      {feedback.id}
                    </Button>
                  </td>
                  <td>{feedback.content}</td>
                  <td>{feedback.creationDate}</td>
                  <td>{feedback.rating}</td>
                  <td>{feedback.course ? <Link to={`/course/${feedback.course.id}`}>{feedback.course.id}</Link> : ''}</td>
                  <td>{feedback.teacher ? <Link to={`/teacher/${feedback.teacher.id}`}>{feedback.teacher.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/feedback/${feedback.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/feedback/${feedback.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/feedback/${feedback.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Feedbacks found</div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
