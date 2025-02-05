import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUserRole } from 'app/shared/model/user-role.model';
import { getEntities } from './user-role.reducer';

export const UserRole = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const userRoleList = useAppSelector(state => state.userRole.entities);
  const loading = useAppSelector(state => state.userRole.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="user-role-heading" data-cy="UserRoleHeading">
        User Roles
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/user-role/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new User Role
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userRoleList && userRoleList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Assigned Date</th>
                <th>Person</th>
                <th>Role</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userRoleList.map((userRole, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/user-role/${userRole.id}`} color="link" size="sm">
                      {userRole.id}
                    </Button>
                  </td>
                  <td>{userRole.assignedDate}</td>
                  <td>
                    {userRole.people
                      ? userRole.people.map((val, j) => (
                          <span key={j}>
                            <Link to={`/person/${val.id}`}>{val.id}</Link>
                            {j === userRole.people.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td>
                    {userRole.roles
                      ? userRole.roles.map((val, j) => (
                          <span key={j}>
                            <Link to={`/role/${val.id}`}>{val.id}</Link>
                            {j === userRole.roles.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/user-role/${userRole.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/user-role/${userRole.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/user-role/${userRole.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No User Roles found</div>
        )}
      </div>
    </div>
  );
};

export default UserRole;
