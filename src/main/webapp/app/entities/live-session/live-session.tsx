import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILiveSession } from 'app/shared/model/live-session.model';
import { getEntities } from './live-session.reducer';

export const LiveSession = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const liveSessionList = useAppSelector(state => state.liveSession.entities);
  const loading = useAppSelector(state => state.liveSession.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="live-session-heading" data-cy="LiveSessionHeading">
        Live Sessions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/live-session/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Live Session
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {liveSessionList && liveSessionList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Session Title</th>
                <th>Session Date</th>
                <th>Duration</th>
                <th>Meeting Link</th>
                <th>Course</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {liveSessionList.map((liveSession, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/live-session/${liveSession.id}`} color="link" size="sm">
                      {liveSession.id}
                    </Button>
                  </td>
                  <td>{liveSession.sessionTitle}</td>
                  <td>{liveSession.sessionDate}</td>
                  <td>{liveSession.duration}</td>
                  <td>{liveSession.meetingLink}</td>
                  <td>{liveSession.course ? <Link to={`/course/${liveSession.course.id}`}>{liveSession.course.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/live-session/${liveSession.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/live-session/${liveSession.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/live-session/${liveSession.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Live Sessions found</div>
        )}
      </div>
    </div>
  );
};

export default LiveSession;
