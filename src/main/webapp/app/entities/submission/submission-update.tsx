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
import { IAssignment } from 'app/shared/model/assignment.model';
import { getEntities as getAssignments } from 'app/entities/assignment/assignment.reducer';
import { IQuiz } from 'app/shared/model/quiz.model';
import { getEntities as getQuizzes } from 'app/entities/quiz/quiz.reducer';
import { ISubmission } from 'app/shared/model/submission.model';
import { getEntity, updateEntity, createEntity, reset } from './submission.reducer';

export const SubmissionUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const students = useAppSelector(state => state.student.entities);
  const assignments = useAppSelector(state => state.assignment.entities);
  const quizzes = useAppSelector(state => state.quiz.entities);
  const submissionEntity = useAppSelector(state => state.submission.entity);
  const loading = useAppSelector(state => state.submission.loading);
  const updating = useAppSelector(state => state.submission.updating);
  const updateSuccess = useAppSelector(state => state.submission.updateSuccess);
  const handleClose = () => {
    props.history.push('/submission');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }

    dispatch(getStudents({}));
    dispatch(getAssignments({}));
    dispatch(getQuizzes({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...submissionEntity,
      ...values,
      student: students.find(it => it.id.toString() === values.student.toString()),
      assignment: assignments.find(it => it.id.toString() === values.assignment.toString()),
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
          ...submissionEntity,
          student: submissionEntity?.student?.id,
          assignment: submissionEntity?.assignment?.id,
          quiz: submissionEntity?.quiz?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="alimranStudentManagmentApp.submission.home.createOrEditLabel" data-cy="SubmissionCreateUpdateHeading">
            Create or edit a Submission
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="submission-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField
                label="Submission Date"
                id="submission-submissionDate"
                name="submissionDate"
                data-cy="submissionDate"
                type="text"
                validate={{
                  required: { value: true, message: 'This field is required.' },
                }}
              />
              <ValidatedField label="Grade" id="submission-grade" name="grade" data-cy="grade" type="text" />
              <ValidatedField label="Feedback" id="submission-feedback" name="feedback" data-cy="feedback" type="text" />
              <ValidatedField id="submission-student" name="student" data-cy="student" label="Student" type="select">
                <option value="" key="0" />
                {students
                  ? students.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="submission-assignment" name="assignment" data-cy="assignment" label="Assignment" type="select">
                <option value="" key="0" />
                {assignments
                  ? assignments.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="submission-quiz" name="quiz" data-cy="quiz" label="Quiz" type="select">
                <option value="" key="0" />
                {quizzes
                  ? quizzes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/submission" replace color="info">
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

export default SubmissionUpdate;
