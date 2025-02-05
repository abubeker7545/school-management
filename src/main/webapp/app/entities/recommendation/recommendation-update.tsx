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
import { ITeacher } from 'app/shared/model/teacher.model';
import { getEntities as getTeachers } from 'app/entities/teacher/teacher.reducer';
import { IRecommendation } from 'app/shared/model/recommendation.model';
import { getEntity, updateEntity, createEntity, reset } from './recommendation.reducer';

export const RecommendationUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const students = useAppSelector(state => state.student.entities);
  const teachers = useAppSelector(state => state.teacher.entities);
  const recommendationEntity = useAppSelector(state => state.recommendation.entity);
  const loading = useAppSelector(state => state.recommendation.loading);
  const updating = useAppSelector(state => state.recommendation.updating);
  const updateSuccess = useAppSelector(state => state.recommendation.updateSuccess);
  const handleClose = () => {
    props.history.push('/recommendation');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getStudents({}));
    dispatch(getTeachers({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...recommendationEntity,
      ...values,
      student: students.find(it => it.id.toString() === values.student.toString()),
      teacher: teachers.find(it => it.id.toString() === values.teacher.toString()),
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
          ...recommendationEntity,
          student: recommendationEntity?.student?.id,
          teacher: recommendationEntity?.teacher?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.recommendation.home.createOrEditLabel" data-cy="RecommendationCreateUpdateHeading">
            Create or edit a Recommendation
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
                <ValidatedField name="id" required readOnly id="recommendation-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Recommended Courses"
                id="recommendation-recommendedCourses"
                name="recommendedCourses"
                data-cy="recommendedCourses"
                type="text"
              />
              <ValidatedField
                label="Recommended Resources"
                id="recommendation-recommendedResources"
                name="recommendedResources"
                data-cy="recommendedResources"
                type="text"
              />
              <ValidatedField id="recommendation-student" name="student" data-cy="student" label="Student" type="select">
                <option value="" key="0" />
                {students
                  ? students.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="recommendation-teacher" name="teacher" data-cy="teacher" label="Teacher" type="select">
                <option value="" key="0" />
                {teachers
                  ? teachers.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/recommendation" replace color="info">
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

export default RecommendationUpdate;
