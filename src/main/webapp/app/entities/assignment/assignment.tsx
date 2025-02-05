import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAssignment } from 'app/shared/model/assignment.model';
import { getEntities } from './assignment.reducer';

export const Assignment = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const assignmentList = useAppSelector(state => state.assignment.entities);
  const loading = useAppSelector(state => state.assignment.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="assignment-heading" data-cy="AssignmentHeading">
        Assignments
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/assignment/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Assignment
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {assignmentList && assignmentList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Due Date</th>
                <th>Description</th>
                <th>Subject</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {assignmentList.map((assignment, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/assignment/${assignment.id}`} color="link" size="sm">
                      {assignment.id}
                    </Button>
                  </td>
                  <td>{assignment.title}</td>
                  <td>{assignment.dueDate}</td>
                  <td>{assignment.description}</td>
                  <td>{assignment.subject ? <Link to={`/subject/${assignment.subject.id}`}>{assignment.subject.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/assignment/${assignment.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/assignment/${assignment.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/assignment/${assignment.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Assignments found</div>
        )}
      </div>
    </div>
  );
};

export default Assignment;
