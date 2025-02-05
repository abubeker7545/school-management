import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAdministrativeBoard } from 'app/shared/model/administrative-board.model';
import { getEntities as getAdministrativeBoards } from 'app/entities/administrative-board/administrative-board.reducer';
import { IBoardMember } from 'app/shared/model/board-member.model';
import { getEntity, updateEntity, createEntity, reset } from './board-member.reducer';

export const BoardMemberUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const administrativeBoards = useAppSelector(state => state.administrativeBoard.entities);
  const boardMemberEntity = useAppSelector(state => state.boardMember.entity);
  const loading = useAppSelector(state => state.boardMember.loading);
  const updating = useAppSelector(state => state.boardMember.updating);
  const updateSuccess = useAppSelector(state => state.boardMember.updateSuccess);
  const handleClose = () => {
    props.history.push('/board-member');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getAdministrativeBoards({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...boardMemberEntity,
      ...values,
      board: administrativeBoards.find(it => it.id.toString() === values.board.toString()),
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
          ...boardMemberEntity,
          board: boardMemberEntity?.board?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.boardMember.home.createOrEditLabel" data-cy="BoardMemberCreateUpdateHeading">
            Create or edit a BoardMember
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="board-member-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Member Name"
                id="board-member-memberName"
                name="memberName"
                data-cy="memberName"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Position"
                id="board-member-position"
                name="position"
                data-cy="position"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Joining Date"
                id="board-member-joiningDate"
                name="joiningDate"
                data-cy="joiningDate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField id="board-member-board" name="board" data-cy="board" label="Board" type="select">
                <option value="" key="0" />
                {administrativeBoards
                  ? administrativeBoards.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/board-member" replace color="info">
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

export default BoardMemberUpdate;
