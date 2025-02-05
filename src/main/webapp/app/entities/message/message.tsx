import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IMessage } from 'app/shared/model/message.model';
import { getEntities } from './message.reducer';

export const Message = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const messageList = useAppSelector(state => state.message.entities);
  const loading = useAppSelector(state => state.message.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="message-heading" data-cy="MessageHeading">
        Messages
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/message/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Message
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {messageList && messageList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Content</th>
                <th>Timestamp</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Student</th>
                <th>Teacher</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {messageList.map((message, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/message/${message.id}`} color="link" size="sm">
                      {message.id}
                    </Button>
                  </td>
                  <td>{message.content}</td>
                  <td>{message.timestamp}</td>
                  <td>{message.sender}</td>
                  <td>{message.receiver}</td>
                  <td>{message.student ? <Link to={`/student/${message.student.id}`}>{message.student.id}</Link> : ''}</td>
                  <td>{message.teacher ? <Link to={`/teacher/${message.teacher.id}`}>{message.teacher.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/message/${message.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/message/${message.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/message/${message.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Messages found</div>
        )}
      </div>
    </div>
  );
};

export default Message;
