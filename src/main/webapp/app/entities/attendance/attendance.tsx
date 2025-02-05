import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAttendance } from 'app/shared/model/attendance.model';
import { getEntities } from './attendance.reducer';

export const Attendance = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const attendanceList = useAppSelector(state => state.attendance.entities);
  const loading = useAppSelector(state => state.attendance.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="attendance-heading" data-cy="AttendanceHeading">
        Attendances
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/attendance/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Attendance
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {attendanceList && attendanceList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Student</th>
                <th>Class Session</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {attendanceList.map((attendance, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/attendance/${attendance.id}`} color="link" size="sm">
                      {attendance.id}
                    </Button>
                  </td>
                  <td>{attendance.date}</td>
                  <td>{attendance.status ? 'true' : 'false'}</td>
                  <td>{attendance.student ? <Link to={`/student/${attendance.student.id}`}>{attendance.student.id}</Link> : ''}</td>
                  <td>
                    {attendance.classSession ? (
                      <Link to={`/class-session/${attendance.classSession.id}`}>{attendance.classSession.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/attendance/${attendance.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/attendance/${attendance.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`/attendance/${attendance.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Attendances found</div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
