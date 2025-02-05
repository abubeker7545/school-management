import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBranch } from 'app/shared/model/branch.model';
import { getEntities } from './branch.reducer';

export const Branch = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const branchList = useAppSelector(state => state.branch.entities);
  const loading = useAppSelector(state => state.branch.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="branch-heading" data-cy="BranchHeading">
        Branches
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/branch/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Branch
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {branchList && branchList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Contact Email</th>
                <th>Established Date</th>
                <th>Phone</th>
                <th>Manager</th>
                <th>School</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {branchList.map((branch, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/branch/${branch.id}`} color="link" size="sm">
                      {branch.id}
                    </Button>
                  </td>
                  <td>{branch.name}</td>
                  <td>{branch.address}</td>
                  <td>{branch.contactEmail}</td>
                  <td>{branch.establishedDate}</td>
                  <td>{branch.phone}</td>
                  <td>{branch.manager}</td>
                  <td>{branch.school ? <Link to={`/school/${branch.school.id}`}>{branch.school.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/branch/${branch.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/branch/${branch.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/branch/${branch.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Branches found</div>
        )}
      </div>
    </div>
  );
};

export default Branch;
