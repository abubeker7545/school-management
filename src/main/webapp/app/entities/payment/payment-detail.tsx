import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './payment.reducer';

export const PaymentDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const paymentEntity = useAppSelector(state => state.payment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="paymentDetailsHeading">Payment</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{paymentEntity.id}</dd>
          <dt>
            <span id="paymentDate">Payment Date</span>
          </dt>
          <dd>{paymentEntity.paymentDate}</dd>
          <dt>
            <span id="amount">Amount</span>
          </dt>
          <dd>{paymentEntity.amount}</dd>
          <dt>
            <span id="method">Method</span>
          </dt>
          <dd>{paymentEntity.method}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{paymentEntity.description}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{paymentEntity.status}</dd>
          <dt>
            <span id="transactionId">Transaction Id</span>
          </dt>
          <dd>{paymentEntity.transactionId}</dd>
          <dt>Invoice</dt>
          <dd>{paymentEntity.invoice ? paymentEntity.invoice.id : ''}</dd>
          <dt>Branch</dt>
          <dd>{paymentEntity.branch ? paymentEntity.branch.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/payment" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment/${paymentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PaymentDetail;
