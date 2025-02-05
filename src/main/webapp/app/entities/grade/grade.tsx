import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IGrade } from 'app/shared/model/grade.model';
import { getEntities } from './grade.reducer';

export const Grade = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const gradeList = useAppSelector(state => state.grade.entities);
  const loading = useAppSelector(state => state.grade.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="grade-heading" data-cy="GradeHeading">
        Grades
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/grade/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Grade
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {gradeList && gradeList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Score</th>
                <th>Comments</th>
                <th>Student</th>
                <th>Exam</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {gradeList.map((grade, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/grade/${grade.id}`} color="link" size="sm">
                      {grade.id}
                    </Button>
                  </td>
                  <td>{grade.score}</td>
                  <td>{grade.comments}</td>
                  <td>{grade.student ? <Link to={`/student/${grade.student.id}`}>{grade.student.id}</Link> : ''}</td>
                  <td>{grade.exam ? <Link to={`/exam/${grade.exam.id}`}>{grade.exam.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/grade/${grade.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/grade/${grade.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/grade/${grade.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Grades found</div>
        )}
      </div>
    </div>
  );
};

export default Grade;
