import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ILesson } from 'app/shared/model/lesson.model';
import { getEntities as getLessons } from 'app/entities/lesson/lesson.reducer';
import { ILearningMaterial } from 'app/shared/model/learning-material.model';
import { getEntity, updateEntity, createEntity, reset } from './learning-material.reducer';

export const LearningMaterialUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const lessons = useAppSelector(state => state.lesson.entities);
  const learningMaterialEntity = useAppSelector(state => state.learningMaterial.entity);
  const loading = useAppSelector(state => state.learningMaterial.loading);
  const updating = useAppSelector(state => state.learningMaterial.updating);
  const updateSuccess = useAppSelector(state => state.learningMaterial.updateSuccess);
  const handleClose = () => {
    props.history.push('/learning-material');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getLessons({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...learningMaterialEntity,
      ...values,
      lesson: lessons.find(it => it.id.toString() === values.lesson.toString()),
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
          ...learningMaterialEntity,
          lesson: learningMaterialEntity?.lesson?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.learningMaterial.home.createOrEditLabel" data-cy="LearningMaterialCreateUpdateHeading">
            Create or edit a LearningMaterial
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
                <ValidatedField name="id" required readOnly id="learning-material-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Title"
                id="learning-material-title"
                name="title"
                data-cy="title"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Resource Url"
                id="learning-material-resourceUrl"
                name="resourceUrl"
                data-cy="resourceUrl"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Description" id="learning-material-description" name="description" data-cy="description" type="text" />
              <ValidatedField id="learning-material-lesson" name="lesson" data-cy="lesson" label="Lesson" type="select">
                <option value="" key="0" />
                {lessons
                  ? lessons.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/learning-material" replace color="info">
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

export default LearningMaterialUpdate;
