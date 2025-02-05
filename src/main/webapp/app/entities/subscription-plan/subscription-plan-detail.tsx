import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './subscription-plan.reducer';

export const SubscriptionPlanDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const subscriptionPlanEntity = useAppSelector(state => state.subscriptionPlan.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="subscriptionPlanDetailsHeading">SubscriptionPlan</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{subscriptionPlanEntity.id}</dd>
          <dt>
            <span id="planName">Plan Name</span>
          </dt>
          <dd>{subscriptionPlanEntity.planName}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{subscriptionPlanEntity.price}</dd>
          <dt>
            <span id="durationMonths">Duration Months</span>
          </dt>
          <dd>{subscriptionPlanEntity.durationMonths}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{subscriptionPlanEntity.description}</dd>
          <dt>Subscriptions</dt>
          <dd>{subscriptionPlanEntity.subscriptions ? subscriptionPlanEntity.subscriptions.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/subscription-plan" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/subscription-plan/${subscriptionPlanEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SubscriptionPlanDetail;
