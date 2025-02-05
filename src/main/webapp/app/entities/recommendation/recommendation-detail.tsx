import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './recommendation.reducer';

export const RecommendationDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const recommendationEntity = useAppSelector(state => state.recommendation.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="recommendationDetailsHeading">Recommendation</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{recommendationEntity.id}</dd>
          <dt>
            <span id="recommendedCourses">Recommended Courses</span>
          </dt>
          <dd>{recommendationEntity.recommendedCourses}</dd>
          <dt>
            <span id="recommendedResources">Recommended Resources</span>
          </dt>
          <dd>{recommendationEntity.recommendedResources}</dd>
          <dt>Student</dt>
          <dd>{recommendationEntity.student ? recommendationEntity.student.id : ''}</dd>
          <dt>Teacher</dt>
          <dd>{recommendationEntity.teacher ? recommendationEntity.teacher.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/recommendation" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/recommendation/${recommendationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default RecommendationDetail;
