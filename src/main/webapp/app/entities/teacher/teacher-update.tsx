import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPerson } from 'app/shared/model/person.model';
import { getEntities as getPeople } from 'app/entities/person/person.reducer';
import { ISchool } from 'app/shared/model/school.model';
import { getEntities as getSchools } from 'app/entities/school/school.reducer';
import { ITeacher } from 'app/shared/model/teacher.model';
import { getEntity, updateEntity, createEntity, reset } from './teacher.reducer';

export const TeacherUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const people = useAppSelector(state => state.person.entities);
  const schools = useAppSelector(state => state.school.entities);
  const teacherEntity = useAppSelector(state => state.teacher.entity);
  const loading = useAppSelector(state => state.teacher.loading);
  const updating = useAppSelector(state => state.teacher.updating);
  const updateSuccess = useAppSelector(state => state.teacher.updateSuccess);
  const handleClose = () => {
    props.history.push('/teacher');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getPeople({}));
    dispatch(getSchools({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...teacherEntity,
      ...values,
      person: people.find(it => it.id.toString() === values.person.toString()),
      school: schools.find(it => it.id.toString() === values.school.toString()),
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
          ...teacherEntity,
          person: teacherEntity?.person?.id,
          school: teacherEntity?.school?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.teacher.home.createOrEditLabel" data-cy="TeacherCreateUpdateHeading">
            Create or edit a Teacher
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="teacher-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Name"
                id="teacher-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Email"
                id="teacher-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Specialization"
                id="teacher-specialization"
                name="specialization"
                data-cy="specialization"
                type="text"
              />
              <ValidatedField label="Hours Per Week" id="teacher-hoursPerWeek" name="hoursPerWeek" data-cy="hoursPerWeek" type="text" />
              <ValidatedField
                label="Max Hours Per Week"
                id="teacher-maxHoursPerWeek"
                name="maxHoursPerWeek"
                data-cy="maxHoursPerWeek"
                type="text"
              />
              <ValidatedField label="Bio" id="teacher-bio" name="bio" data-cy="bio" type="text" />
              <ValidatedField
                label="Profile Picture"
                id="teacher-profilePicture"
                name="profilePicture"
                data-cy="profilePicture"
                type="text"
              />
              <ValidatedField id="teacher-person" name="person" data-cy="person" label="Person" type="select">
                <option value="" key="0" />
                {people
                  ? people.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="teacher-school" name="school" data-cy="school" label="School" type="select">
                <option value="" key="0" />
                {schools
                  ? schools.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/teacher" replace color="info">
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

export default TeacherUpdate;
