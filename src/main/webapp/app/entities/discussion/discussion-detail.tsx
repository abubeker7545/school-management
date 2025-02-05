import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './discussion.reducer';

export const DiscussionDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const discussionEntity = useAppSelector(state => state.discussion.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="discussionDetailsHeading">Discussion</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{discussionEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{discussionEntity.title}</dd>
          <dt>
            <span id="creationDate">Creation Date</span>
          </dt>
          <dd>{discussionEntity.creationDate}</dd>
          <dt>
            <span id="isClosed">Is Closed</span>
          </dt>
          <dd>{discussionEntity.isClosed ? 'true' : 'false'}</dd>
          <dt>Lesson</dt>
          <dd>{discussionEntity.lesson ? discussionEntity.lesson.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/discussion" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/discussion/${discussionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default DiscussionDetail;
