import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ISubscriptionDSet } from 'app/shared/model/subscription-d-set.model';
import { getEntities as getSubscriptionDSets } from 'app/entities/subscription-d-set/subscription-d-set.reducer';
import { ISubscriptionPlan } from 'app/shared/model/subscription-plan.model';
import { getEntity, updateEntity, createEntity, reset } from './subscription-plan.reducer';

export const SubscriptionPlanUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const subscriptionDSets = useAppSelector(state => state.subscriptionDSet.entities);
  const subscriptionPlanEntity = useAppSelector(state => state.subscriptionPlan.entity);
  const loading = useAppSelector(state => state.subscriptionPlan.loading);
  const updating = useAppSelector(state => state.subscriptionPlan.updating);
  const updateSuccess = useAppSelector(state => state.subscriptionPlan.updateSuccess);
  const handleClose = () => {
    props.history.push('/subscription-plan');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getSubscriptionDSets({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...subscriptionPlanEntity,
      ...values,
      subscriptions: subscriptionDSets.find(it => it.id.toString() === values.subscriptions.toString()),
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
          ...subscriptionPlanEntity,
          subscriptions: subscriptionPlanEntity?.subscriptions?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.subscriptionPlan.home.createOrEditLabel" data-cy="SubscriptionPlanCreateUpdateHeading">
            Create or edit a SubscriptionPlan
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
                <ValidatedField name="id" required readOnly id="subscription-plan-id" label="ID" validate={{ required: true }} />
              ) : null}
              <ValidatedField
                label="Plan Name"
                id="subscription-plan-planName"
                name="planName"
                data-cy="planName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Price"
                id="subscription-plan-price"
                name="price"
                data-cy="price"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 0, message: 'This field should be at least 0.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField
                label="Duration Months"
                id="subscription-plan-durationMonths"
                name="durationMonths"
                data-cy="durationMonths"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  min: { value: 1, message: 'This field should be at least 1.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField label="Description" id="subscription-plan-description" name="description" data-cy="description" type="text" />
              <ValidatedField
                id="subscription-plan-subscriptions"
                name="subscriptions"
                data-cy="subscriptions"
                label="Subscriptions"
                type="select"
              >
                <option value="" key="0" />
                {subscriptionDSets
                  ? subscriptionDSets.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/subscription-plan" replace color="info">
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

export default SubscriptionPlanUpdate;
