import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './subscription-d-set.reducer';

export const SubscriptionDSetDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const subscriptionDSetEntity = useAppSelector(state => state.subscriptionDSet.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="subscriptionDSetDetailsHeading">SubscriptionDSet</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{subscriptionDSetEntity.id}</dd>
          <dt>
            <span id="startDate">Start Date</span>
          </dt>
          <dd>{subscriptionDSetEntity.startDate}</dd>
          <dt>
            <span id="endDate">End Date</span>
          </dt>
          <dd>{subscriptionDSetEntity.endDate}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{subscriptionDSetEntity.status}</dd>
          <dt>
            <span id="renewalDate">Renewal Date</span>
          </dt>
          <dd>{subscriptionDSetEntity.renewalDate}</dd>
          <dt>Student</dt>
          <dd>{subscriptionDSetEntity.student ? subscriptionDSetEntity.student.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/subscription-d-set" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/subscription-d-set/${subscriptionDSetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default SubscriptionDSetDetail;
