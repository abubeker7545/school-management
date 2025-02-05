import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISubscriptionDSet } from 'app/shared/model/subscription-d-set.model';
import { getEntities } from './subscription-d-set.reducer';

export const SubscriptionDSet = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const subscriptionDSetList = useAppSelector(state => state.subscriptionDSet.entities);
  const loading = useAppSelector(state => state.subscriptionDSet.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="subscription-d-set-heading" data-cy="SubscriptionDSetHeading">
        Subscription D Sets
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link
            to="/subscription-d-set/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Subscription D Set
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {subscriptionDSetList && subscriptionDSetList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Renewal Date</th>
                <th>Student</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {subscriptionDSetList.map((subscriptionDSet, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/subscription-d-set/${subscriptionDSet.id}`} color="link" size="sm">
                      {subscriptionDSet.id}
                    </Button>
                  </td>
                  <td>{subscriptionDSet.startDate}</td>
                  <td>{subscriptionDSet.endDate}</td>
                  <td>{subscriptionDSet.status}</td>
                  <td>{subscriptionDSet.renewalDate}</td>
                  <td>
                    {subscriptionDSet.student ? (
                      <Link to={`/student/${subscriptionDSet.student.id}`}>{subscriptionDSet.student.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/subscription-d-set/${subscriptionDSet.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/subscription-d-set/${subscriptionDSet.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/subscription-d-set/${subscriptionDSet.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Subscription D Sets found</div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionDSet;
