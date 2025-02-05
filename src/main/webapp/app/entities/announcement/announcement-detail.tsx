import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './announcement.reducer';

export const AnnouncementDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const announcementEntity = useAppSelector(state => state.announcement.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="announcementDetailsHeading">Announcement</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{announcementEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{announcementEntity.title}</dd>
          <dt>
            <span id="content">Content</span>
          </dt>
          <dd>{announcementEntity.content}</dd>
          <dt>
            <span id="creationDate">Creation Date</span>
          </dt>
          <dd>{announcementEntity.creationDate}</dd>
          <dt>Course</dt>
          <dd>{announcementEntity.course ? announcementEntity.course.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/announcement" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/announcement/${announcementEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default AnnouncementDetail;
