import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IStudent } from 'app/shared/model/student.model';
import { getEntities as getStudents } from 'app/entities/student/student.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { ICourseEnrollment } from 'app/shared/model/course-enrollment.model';
import { getEntity, updateEntity, createEntity, reset } from './course-enrollment.reducer';

export const CourseEnrollmentUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const students = useAppSelector(state => state.student.entities);
  const courses = useAppSelector(state => state.course.entities);
  const courseEnrollmentEntity = useAppSelector(state => state.courseEnrollment.entity);
  const loading = useAppSelector(state => state.courseEnrollment.loading);
  const updating = useAppSelector(state => state.courseEnrollment.updating);
  const updateSuccess = useAppSelector(state => state.courseEnrollment.updateSuccess);
  const handleClose = () => {
    props.history.push('/course-enrollment');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getStudents({}));
    dispatch(getCourses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...courseEnrollmentEntity,
      ...values,
      student: students.find(it => it.id.toString() === values.student.toString()),
      course: courses.find(it => it.id.toString() === values.course.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...courseEnrollmentEntity,
          student: courseEnrollmentEntity?.student?.id,
          course: courseEnrollmentEntity?.course?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.courseEnrollment.home.createOrEditLabel" data-cy="CourseEnrollmentCreateUpdateHeading">
            Create or edit a CourseEnrollment
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField name="id" required readOnly id="course-enrollment-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Enrollment Date"
                id="course-enrollment-enrollmentDate"
                name="enrollmentDate"
                data-cy="enrollmentDate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Completion Status"
                id="course-enrollment-completionStatus"
                name="completionStatus"
                data-cy="completionStatus"
                check
                type="checkbox"
              />
              <ValidatedField label="Progress" id="course-enrollment-progress" name="progress" data-cy="progress" type="text" />
              <ValidatedField id="course-enrollment-student" name="student" data-cy="student" label="Student" type="select">
                <option value="" key="0" />
                {students
                  ? students.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="course-enrollment-course" name="course" data-cy="course" label="Course" type="select">
                <option value="" key="0" />
                {courses
                  ? courses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/course-enrollment" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default CourseEnrollmentUpdate;
