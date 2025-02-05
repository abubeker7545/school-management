import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ITeacher } from 'app/shared/model/teacher.model';
import { getEntities } from './teacher.reducer';

export const Teacher = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const teacherList = useAppSelector(state => state.teacher.entities);
  const loading = useAppSelector(state => state.teacher.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="teacher-heading" data-cy="TeacherHeading">
        Teachers
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/teacher/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Teacher
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {teacherList && teacherList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Specialization</th>
                <th>Hours Per Week</th>
                <th>Max Hours Per Week</th>
                <th>Bio</th>
                <th>Profile Picture</th>
                <th>Person</th>
                <th>School</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {teacherList.map((teacher, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/teacher/${teacher.id}`} color="link" size="sm">
                      {teacher.id}
                    </Button>
                  </td>
                  <td>{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.specialization}</td>
                  <td>{teacher.hoursPerWeek}</td>
                  <td>{teacher.maxHoursPerWeek}</td>
                  <td>{teacher.bio}</td>
                  <td>{teacher.profilePicture}</td>
                  <td>{teacher.person ? <Link to={`/person/${teacher.person.id}`}>{teacher.person.id}</Link> : ''}</td>
                  <td>{teacher.school ? <Link to={`/school/${teacher.school.id}`}>{teacher.school.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/teacher/${teacher.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/teacher/${teacher.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/teacher/${teacher.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Teachers found</div>
        )}
      </div>
    </div>
  );
};

export default Teacher;
