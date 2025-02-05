import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './message.reducer';

export const MessageDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const messageEntity = useAppSelector(state => state.message.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="messageDetailsHeading">Message</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{messageEntity.id}</dd>
          <dt>
            <span id="content">Content</span>
          </dt>
          <dd>{messageEntity.content}</dd>
          <dt>
            <span id="timestamp">Timestamp</span>
          </dt>
          <dd>{messageEntity.timestamp}</dd>
          <dt>
            <span id="sender">Sender</span>
          </dt>
          <dd>{messageEntity.sender}</dd>
          <dt>
            <span id="receiver">Receiver</span>
          </dt>
          <dd>{messageEntity.receiver}</dd>
          <dt>Student</dt>
          <dd>{messageEntity.student ? messageEntity.student.id : ''}</dd>
          <dt>Teacher</dt>
          <dd>{messageEntity.teacher ? messageEntity.teacher.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/message" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/message/${messageEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default MessageDetail;
