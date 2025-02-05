import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './notification.reducer';

export const NotificationDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const notificationEntity = useAppSelector(state => state.notification.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="notificationDetailsHeading">Notification</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{notificationEntity.id}</dd>
          <dt>
            <span id="content">Content</span>
          </dt>
          <dd>{notificationEntity.content}</dd>
          <dt>
            <span id="dateSent">Date Sent</span>
          </dt>
          <dd>{notificationEntity.dateSent}</dd>
          <dt>
            <span id="isRead">Is Read</span>
          </dt>
          <dd>{notificationEntity.isRead ? 'true' : 'false'}</dd>
          <dt>Student</dt>
          <dd>{notificationEntity.student ? notificationEntity.student.id : ''}</dd>
          <dt>Teacher</dt>
          <dd>{notificationEntity.teacher ? notificationEntity.teacher.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/notification" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/notification/${notificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default NotificationDetail;
