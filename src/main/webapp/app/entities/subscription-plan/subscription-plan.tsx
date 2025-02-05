import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISubscriptionPlan } from 'app/shared/model/subscription-plan.model';
import { getEntities } from './subscription-plan.reducer';

export const SubscriptionPlan = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const subscriptionPlanList = useAppSelector(state => state.subscriptionPlan.entities);
  const loading = useAppSelector(state => state.subscriptionPlan.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="subscription-plan-heading" data-cy="SubscriptionPlanHeading">
        Subscription Plans
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/subscription-plan/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Subscription Plan
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {subscriptionPlanList && subscriptionPlanList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Plan Name</th>
                <th>Price</th>
                <th>Duration Months</th>
                <th>Description</th>
                <th>Subscriptions</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subscriptionPlanList.map((subscriptionPlan, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/subscription-plan/${subscriptionPlan.id}`} color="link" size="sm">
                      {subscriptionPlan.id}
                    </Button>
                  </td>
                  <td>{subscriptionPlan.planName}</td>
                  <td>{subscriptionPlan.price}</td>
                  <td>{subscriptionPlan.durationMonths}</td>
                  <td>{subscriptionPlan.description}</td>
                  <td>
                    {subscriptionPlan.subscriptions ? (
                      <Link to={`/subscription-d-set/${subscriptionPlan.subscriptions.id}`}>{subscriptionPlan.subscriptions.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/subscription-plan/${subscriptionPlan.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/subscription-plan/${subscriptionPlan.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/subscription-plan/${subscriptionPlan.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Subscription Plans found</div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
