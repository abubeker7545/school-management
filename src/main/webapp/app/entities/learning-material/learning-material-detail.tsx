import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './learning-material.reducer';

export const LearningMaterialDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const learningMaterialEntity = useAppSelector(state => state.learningMaterial.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="learningMaterialDetailsHeading">LearningMaterial</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{learningMaterialEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{learningMaterialEntity.title}</dd>
          <dt>
            <span id="resourceUrl">Resource Url</span>
          </dt>
          <dd>{learningMaterialEntity.resourceUrl}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{learningMaterialEntity.description}</dd>
          <dt>Lesson</dt>
          <dd>{learningMaterialEntity.lesson ? learningMaterialEntity.lesson.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/learning-material" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/learning-material/${learningMaterialEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default LearningMaterialDetail;
