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
import { ISubscriptionDSet } from 'app/shared/model/subscription-d-set.model';
import { getEntity, updateEntity, createEntity, reset } from './subscription-d-set.reducer';

export const SubscriptionDSetUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const students = useAppSelector(state => state.student.entities);
  const subscriptionDSetEntity = useAppSelector(state => state.subscriptionDSet.entity);
  const loading = useAppSelector(state => state.subscriptionDSet.loading);
  const updating = useAppSelector(state => state.subscriptionDSet.updating);
  const updateSuccess = useAppSelector(state => state.subscriptionDSet.updateSuccess);
  const handleClose = () => {
    props.history.push('/subscription-d-set');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getStudents({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...subscriptionDSetEntity,
      ...values,
      student: students.find(it => it.id.toString() === values.student.toString()),
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
          ...subscriptionDSetEntity,
          student: subscriptionDSetEntity?.student?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.subscriptionDSet.home.createOrEditLabel" data-cy="SubscriptionDSetCreateUpdateHeading">
            Create or edit a SubscriptionDSet
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
                <ValidatedField name="id" required readOnly id="subscription-d-set-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Start Date"
                id="subscription-d-set-startDate"
                name="startDate"
                data-cy="startDate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="End Date"
                id="subscription-d-set-endDate"
                name="endDate"
                data-cy="endDate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Status"
                id="subscription-d-set-status"
                name="status"
                data-cy="status"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Renewal Date"
                id="subscription-d-set-renewalDate"
                name="renewalDate"
                data-cy="renewalDate"
                type="text"
              />
              <ValidatedField id="subscription-d-set-student" name="student" data-cy="student" label="Student" type="select">
                <option value="" key="0" />
                {students
                  ? students.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/subscription-d-set" replace color="info">
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

export default SubscriptionDSetUpdate;
