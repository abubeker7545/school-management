import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IClassSession } from 'app/shared/model/class-session.model';
import { getEntities as getClassSessions } from 'app/entities/class-session/class-session.reducer';
import { IClassroom } from 'app/shared/model/classroom.model';
import { getEntity, updateEntity, createEntity, reset } from './classroom.reducer';

export const ClassroomUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const classSessions = useAppSelector(state => state.classSession.entities);
  const classroomEntity = useAppSelector(state => state.classroom.entity);
  const loading = useAppSelector(state => state.classroom.loading);
  const updating = useAppSelector(state => state.classroom.updating);
  const updateSuccess = useAppSelector(state => state.classroom.updateSuccess);
  const handleClose = () => {
    props.history.push('/classroom');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getClassSessions({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...classroomEntity,
      ...values,
      classSessions: classSessions.find(it => it.id.toString() === values.classSessions.toString()),
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
          ...classroomEntity,
          classSessions: classroomEntity?.classSessions?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.classroom.home.createOrEditLabel" data-cy="ClassroomCreateUpdateHeading">
            Create or edit a Classroom
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="classroom-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Name"
                id="classroom-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Capacity"
                id="classroom-capacity"
                name="capacity"
                data-cy="capacity"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 1, message: 'This field should be at least 1.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField label="Location" id="classroom-location" name="location" data-cy="location" type="text" />
              <ValidatedField
                id="classroom-classSessions"
                name="classSessions"
                data-cy="classSessions"
                label="Class Sessions"
                type="select"
              >
                <option value="" key="0" />
                {classSessions
                  ? classSessions.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/classroom" replace color="info">
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

export default ClassroomUpdate;
