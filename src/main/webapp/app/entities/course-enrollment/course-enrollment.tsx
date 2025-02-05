import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICourseEnrollment } from 'app/shared/model/course-enrollment.model';
import { getEntities } from './course-enrollment.reducer';

export const CourseEnrollment = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const courseEnrollmentList = useAppSelector(state => state.courseEnrollment.entities);
  const loading = useAppSelector(state => state.courseEnrollment.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="course-enrollment-heading" data-cy="CourseEnrollmentHeading">
        Course Enrollments
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/course-enrollment/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Course Enrollment
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {courseEnrollmentList && courseEnrollmentList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Enrollment Date</th>
                <th>Completion Status</th>
                <th>Progress</th>
                <th>Student</th>
                <th>Course</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {courseEnrollmentList.map((courseEnrollment, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/course-enrollment/${courseEnrollment.id}`} color="link" size="sm">
                      {courseEnrollment.id}
                    </Button>
                  </td>
                  <td>{courseEnrollment.enrollmentDate}</td>
                  <td>{courseEnrollment.completionStatus ? 'true' : 'false'}</td>
                  <td>{courseEnrollment.progress}</td>
                  <td>
                    {courseEnrollment.student ? (
                      <Link to={`/student/${courseEnrollment.student.id}`}>{courseEnrollment.student.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {courseEnrollment.course ? <Link to={`/course/${courseEnrollment.course.id}`}>{courseEnrollment.course.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/course-enrollment/${courseEnrollment.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/course-enrollment/${courseEnrollment.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/course-enrollment/${courseEnrollment.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Course Enrollments found</div>
        )}
      </div>
    </div>
  );
};

export default CourseEnrollment;
