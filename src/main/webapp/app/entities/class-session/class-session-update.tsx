import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISubject } from 'app/shared/model/subject.model';
import { getEntities as getSubjects } from 'app/entities/subject/subject.reducer';
import { IClassSession } from 'app/shared/model/class-session.model';
import { getEntity, updateEntity, createEntity, reset } from './class-session.reducer';

export const ClassSessionUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const subjects = useAppSelector(state => state.subject.entities);
  const classSessionEntity = useAppSelector(state => state.classSession.entity);
  const loading = useAppSelector(state => state.classSession.loading);
  const updating = useAppSelector(state => state.classSession.updating);
  const updateSuccess = useAppSelector(state => state.classSession.updateSuccess);
  const handleClose = () => {
    props.history.push('/class-session');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getSubjects({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...classSessionEntity,
      ...values,
      subject: subjects.find(it => it.id.toString() === values.subject.toString()),
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
          ...classSessionEntity,
          subject: classSessionEntity?.subject?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.classSession.home.createOrEditLabel" data-cy="ClassSessionCreateUpdateHeading">
            Create or edit a ClassSession
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
                <ValidatedField name="id" required readOnly id="class-session-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Grade Level"
                id="class-session-gradeLevel"
                name="gradeLevel"
                data-cy="gradeLevel"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Day Of Week"
                id="class-session-dayOfWeek"
                name="dayOfWeek"
                data-cy="dayOfWeek"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 1, message: 'This field should be at least 1.' },
                  max: { value: 7, message: 'This field cannot be more than 7.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Start Time"
                id="class-session-startTime"
                name="startTime"
                data-cy="startTime"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="End Time"
                id="class-session-endTime"
                name="endTime"
                data-cy="endTime"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="class-session-subject" name="subject" data-cy="subject" label="Subject" type="select">
                <option value="" key="0" />
                {subjects
                  ? subjects.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/class-session" replace color="info">
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

export default ClassSessionUpdate;
