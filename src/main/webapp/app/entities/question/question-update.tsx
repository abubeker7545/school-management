import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IQuiz } from 'app/shared/model/quiz.model';
import { getEntities as getQuizzes } from 'app/entities/quiz/quiz.reducer';
import { IQuestion } from 'app/shared/model/question.model';
import { getEntity, updateEntity, createEntity, reset } from './question.reducer';

export const QuestionUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const quizzes = useAppSelector(state => state.quiz.entities);
  const questionEntity = useAppSelector(state => state.question.entity);
  const loading = useAppSelector(state => state.question.loading);
  const updating = useAppSelector(state => state.question.updating);
  const updateSuccess = useAppSelector(state => state.question.updateSuccess);
  const handleClose = () => {
    props.history.push('/question');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getQuizzes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...questionEntity,
      ...values,
      quiz: quizzes.find(it => it.id.toString() === values.quiz.toString()),
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
          ...questionEntity,
          quiz: questionEntity?.quiz?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.question.home.createOrEditLabel" data-cy="QuestionCreateUpdateHeading">
            Create or edit a Question
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="question-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Text"
                id="question-text"
                name="text"
                data-cy="text"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Answer Options"
                id="question-answerOptions"
                name="answerOptions"
                data-cy="answerOptions"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Correct Answer"
                id="question-correctAnswer"
                name="correctAnswer"
                data-cy="correctAnswer"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField
                label="Points"
                id="question-points"
                name="points"
                data-cy="points"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                  validate: v => isNumber(v) || 'This field should be a number.',
                }}
              />
              <ValidatedField id="question-quiz" name="quiz" data-cy="quiz" label="Quiz" type="select">
                <option value="" key="0" />
                {quizzes
                  ? quizzes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/question" replace color="info">
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

export default QuestionUpdate;
