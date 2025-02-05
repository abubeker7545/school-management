import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IRoleAssignment } from 'app/shared/model/role-assignment.model';
import { getEntities } from './role-assignment.reducer';

export const RoleAssignment = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const roleAssignmentList = useAppSelector(state => state.roleAssignment.entities);
  const loading = useAppSelector(state => state.roleAssignment.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="role-assignment-heading" data-cy="RoleAssignmentHeading">
        Role Assignments
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/role-assignment/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Role Assignment
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {roleAssignmentList && roleAssignmentList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Role Type</th>
                <th>Effective Date</th>
                <th>Expiration Date</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {roleAssignmentList.map((roleAssignment, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/role-assignment/${roleAssignment.id}`} color="link" size="sm">
                      {roleAssignment.id}
                    </Button>
                  </td>
                  <td>{roleAssignment.roleType}</td>
                  <td>{roleAssignment.effectiveDate}</td>
                  <td>{roleAssignment.expirationDate}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/role-assignment/${roleAssignment.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/role-assignment/${roleAssignment.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/role-assignment/${roleAssignment.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Role Assignments found</div>
        )}
      </div>
    </div>
  );
};

export default RoleAssignment;
