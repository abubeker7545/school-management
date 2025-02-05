import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISchool } from 'app/shared/model/school.model';
import { getEntity, updateEntity, createEntity, reset } from './school.reducer';

export const SchoolUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const schoolEntity = useAppSelector(state => state.school.entity);
  const loading = useAppSelector(state => state.school.loading);
  const updating = useAppSelector(state => state.school.updating);
  const updateSuccess = useAppSelector(state => state.school.updateSuccess);
  const handleClose = () => {
    props.history.push('/school');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...schoolEntity,
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
          ...schoolEntity,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.school.home.createOrEditLabel" data-cy="SchoolCreateUpdateHeading">
            Create or edit a School
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="school-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Name"
                id="school-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Address"
                id="school-address"
                name="address"
                data-cy="address"
                type="text"
                validate={{
                  maxLength: { value: 200, message: 'This field cannot be longer than 200 characters.' },
                }}
              />
              <ValidatedField
                label="Established Date"
                id="school-establishedDate"
                name="establishedDate"
                data-cy="establishedDate"
                type="text"
              />
              <ValidatedField label="Contact Email" id="school-contactEmail" name="contactEmail" data-cy="contactEmail" type="text" />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/school" replace color="info">
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

export default SchoolUpdate;
