import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './feedback.reducer';

export const FeedbackDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const feedbackEntity = useAppSelector(state => state.feedback.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="feedbackDetailsHeading">Feedback</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{feedbackEntity.id}</dd>
          <dt>
            <span id="content">Content</span>
          </dt>
          <dd>{feedbackEntity.content}</dd>
          <dt>
            <span id="creationDate">Creation Date</span>
          </dt>
          <dd>{feedbackEntity.creationDate}</dd>
          <dt>
            <span id="rating">Rating</span>
          </dt>
          <dd>{feedbackEntity.rating}</dd>
          <dt>Course</dt>
          <dd>{feedbackEntity.course ? feedbackEntity.course.id : ''}</dd>
          <dt>Teacher</dt>
          <dd>{feedbackEntity.teacher ? feedbackEntity.teacher.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/feedback" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/feedback/${feedbackEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default FeedbackDetail;
