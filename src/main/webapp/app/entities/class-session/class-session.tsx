import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IClassSession } from 'app/shared/model/class-session.model';
import { getEntities } from './class-session.reducer';

export const ClassSession = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const classSessionList = useAppSelector(state => state.classSession.entities);
  const loading = useAppSelector(state => state.classSession.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="class-session-heading" data-cy="ClassSessionHeading">
        Class Sessions
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/class-session/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Class Session
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {classSessionList && classSessionList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Grade Level</th>
                <th>Day Of Week</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Subject</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {classSessionList.map((classSession, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/class-session/${classSession.id}`} color="link" size="sm">
                      {classSession.id}
                    </Button>
                  </td>
                  <td>{classSession.gradeLevel}</td>
                  <td>{classSession.dayOfWeek}</td>
                  <td>{classSession.startTime}</td>
                  <td>{classSession.endTime}</td>
                  <td>{classSession.subject ? <Link to={`/subject/${classSession.subject.id}`}>{classSession.subject.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/class-session/${classSession.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/class-session/${classSession.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/class-session/${classSession.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Class Sessions found</div>
        )}
      </div>
    </div>
  );
};

export default ClassSession;
