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
import { IAdministrator } from 'app/shared/model/administrator.model';
import { getEntities as getAdministrators } from 'app/entities/administrator/administrator.reducer';
import { IUserRole } from 'app/shared/model/user-role.model';
import { getEntities as getUserRoles } from 'app/entities/user-role/user-role.reducer';
import { IPerson } from 'app/shared/model/person.model';
import { getEntity, updateEntity, createEntity, reset } from './person.reducer';

export const PersonUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const students = useAppSelector(state => state.student.entities);
  const teachers = useAppSelector(state => state.teacher.entities);
  const administrators = useAppSelector(state => state.administrator.entities);
  const userRoles = useAppSelector(state => state.userRole.entities);
  const personEntity = useAppSelector(state => state.person.entity);
  const loading = useAppSelector(state => state.person.loading);
  const updating = useAppSelector(state => state.person.updating);
  const updateSuccess = useAppSelector(state => state.person.updateSuccess);
  const handleClose = () => {
    props.history.push('/person');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getStudents({}));
    dispatch(getTeachers({}));
    dispatch(getAdministrators({}));
    dispatch(getUserRoles({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...personEntity,
      ...values,
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
          ...personEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.person.home.createOrEditLabel" data-cy="PersonCreateUpdateHeading">
            Create or edit a Person
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="person-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Username"
                id="person-username"
                name="username"
                data-cy="username"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Email"
                id="person-email"
                name="email"
                data-cy="email"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Password"
                id="person-password"
                name="password"
                data-cy="password"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Token" id="person-token" name="token" data-cy="token" type="text" validate={{}} />
              <ValidatedField
                label="Profile Picture"
                id="person-profilePicture"
                name="profilePicture"
                data-cy="profilePicture"
                type="text"
              />
              <ValidatedField label="Bio" id="person-bio" name="bio" data-cy="bio" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/person" replace color="info">
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

export default PersonUpdate;
