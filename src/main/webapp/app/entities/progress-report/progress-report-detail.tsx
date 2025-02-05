import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './progress-report.reducer';

export const ProgressReportDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const progressReportEntity = useAppSelector(state => state.progressReport.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="progressReportDetailsHeading">ProgressReport</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{progressReportEntity.id}</dd>
          <dt>
            <span id="reportDate">Report Date</span>
          </dt>
          <dd>{progressReportEntity.reportDate}</dd>
          <dt>
            <span id="progress">Progress</span>
          </dt>
          <dd>{progressReportEntity.progress}</dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{progressReportEntity.notes}</dd>
          <dt>Student</dt>
          <dd>{progressReportEntity.student ? progressReportEntity.student.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/progress-report" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/progress-report/${progressReportEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProgressReportDetail;
