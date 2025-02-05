import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IDiscussion } from 'app/shared/model/discussion.model';
import { getEntities } from './discussion.reducer';

export const Discussion = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const discussionList = useAppSelector(state => state.discussion.entities);
  const loading = useAppSelector(state => state.discussion.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="discussion-heading" data-cy="DiscussionHeading">
        Discussions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/discussion/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Discussion
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {discussionList && discussionList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Creation Date</th>
                <th>Is Closed</th>
                <th>Lesson</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {discussionList.map((discussion, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/discussion/${discussion.id}`} color="link" size="sm">
                      {discussion.id}
                    </Button>
                  </td>
                  <td>{discussion.title}</td>
                  <td>{discussion.creationDate}</td>
                  <td>{discussion.isClosed ? 'true' : 'false'}</td>
                  <td>{discussion.lesson ? <Link to={`/lesson/${discussion.lesson.id}`}>{discussion.lesson.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/discussion/${discussion.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/discussion/${discussion.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/discussion/${discussion.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Discussions found</div>
        )}
      </div>
    </div>
  );
};

export default Discussion;
