import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAdministrator } from 'app/shared/model/administrator.model';
import { getEntities as getAdministrators } from 'app/entities/administrator/administrator.reducer';
import { IAdministrativeBoard } from 'app/shared/model/administrative-board.model';
import { getEntity, updateEntity, createEntity, reset } from './administrative-board.reducer';

export const AdministrativeBoardUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const administrators = useAppSelector(state => state.administrator.entities);
  const administrativeBoardEntity = useAppSelector(state => state.administrativeBoard.entity);
  const loading = useAppSelector(state => state.administrativeBoard.loading);
  const updating = useAppSelector(state => state.administrativeBoard.updating);
  const updateSuccess = useAppSelector(state => state.administrativeBoard.updateSuccess);
  const handleClose = () => {
    props.history.push('/administrative-board');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getAdministrators({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...administrativeBoardEntity,
      ...values,
      administrators: mapIdList(values.administrators),
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
          ...administrativeBoardEntity,
          administrators: administrativeBoardEntity?.administrators?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.administrativeBoard.home.createOrEditLabel" data-cy="AdministrativeBoardCreateUpdateHeading">
            Create or edit a AdministrativeBoard
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
                <ValidatedField name="id" required readOnly id="administrative-board-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Name"
                id="administrative-board-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Description"
                id="administrative-board-description"
                name="description"
                data-cy="description"
                type="text"
              />
              <ValidatedField
                label="Creation Date"
                id="administrative-board-creationDate"
                name="creationDate"
                data-cy="creationDate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Board Head" id="administrative-board-boardHead" name="boardHead" data-cy="boardHead" type="text" />
              <ValidatedField
                label="Administrators"
                id="administrative-board-administrators"
                data-cy="administrators"
                type="select"
                multiple
                name="administrators"
              >
                <option value="" key="0" />
                {administrators
                  ? administrators.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/administrative-board" replace color="info">
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

export default AdministrativeBoardUpdate;
