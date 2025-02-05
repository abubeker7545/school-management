import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISchool } from 'app/shared/model/school.model';
import { getEntities as getSchools } from 'app/entities/school/school.reducer';
import { IBranch } from 'app/shared/model/branch.model';
import { getEntity, updateEntity, createEntity, reset } from './branch.reducer';

export const BranchUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const schools = useAppSelector(state => state.school.entities);
  const branchEntity = useAppSelector(state => state.branch.entity);
  const loading = useAppSelector(state => state.branch.loading);
  const updating = useAppSelector(state => state.branch.updating);
  const updateSuccess = useAppSelector(state => state.branch.updateSuccess);
  const handleClose = () => {
    props.history.push('/branch');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getSchools({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...branchEntity,
      ...values,
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
          ...branchEntity,
          school: branchEntity?.school?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.branch.home.createOrEditLabel" data-cy="BranchCreateUpdateHeading">
            Create or edit a Branch
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="branch-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Name"
                id="branch-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Address"
                id="branch-address"
                name="address"
                data-cy="address"
                type="text"
                validate={{
                  maxLength: { value: 200, message: 'This field cannot be longer than 200 characters.' },
                }}
              />
              <ValidatedField
                label="Contact Email"
                id="branch-contactEmail"
                name="contactEmail"
                data-cy="contactEmail"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Established Date"
                id="branch-establishedDate"
                name="establishedDate"
                data-cy="establishedDate"
                type="text"
              />
              <ValidatedField label="Phone" id="branch-phone" name="phone" data-cy="phone" type="text" />
              <ValidatedField label="Manager" id="branch-manager" name="manager" data-cy="manager" type="text" />
              <ValidatedField id="branch-school" name="school" data-cy="school" label="School" type="select">
                <option value="" key="0" />
                {schools
                  ? schools.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/branch" replace color="info">
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

export default BranchUpdate;
