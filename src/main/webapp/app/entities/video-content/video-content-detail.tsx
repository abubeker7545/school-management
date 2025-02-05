import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './video-content.reducer';

export const VideoContentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const videoContentEntity = useAppSelector(state => state.videoContent.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="videoContentDetailsHeading">VideoContent</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{videoContentEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{videoContentEntity.title}</dd>
          <dt>
            <span id="videoUrl">Video Url</span>
          </dt>
          <dd>{videoContentEntity.videoUrl}</dd>
          <dt>
            <span id="duration">Duration</span>
          </dt>
          <dd>{videoContentEntity.duration}</dd>
          <dt>Lesson</dt>
          <dd>{videoContentEntity.lesson ? videoContentEntity.lesson.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/video-content" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/video-content/${videoContentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default VideoContentDetail;
