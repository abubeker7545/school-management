import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProgressReport } from 'app/shared/model/progress-report.model';
import { getEntities } from './progress-report.reducer';

export const ProgressReport = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const progressReportList = useAppSelector(state => state.progressReport.entities);
  const loading = useAppSelector(state => state.progressReport.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="progress-report-heading" data-cy="ProgressReportHeading">
        Progress Reports
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/progress-report/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Progress Report
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {progressReportList && progressReportList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Report Date</th>
                <th>Progress</th>
                <th>Notes</th>
                <th>Student</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {progressReportList.map((progressReport, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/progress-report/${progressReport.id}`} color="link" size="sm">
                      {progressReport.id}
                    </Button>
                  </td>
                  <td>{progressReport.reportDate}</td>
                  <td>{progressReport.progress}</td>
                  <td>{progressReport.notes}</td>
                  <td>
                    {progressReport.student ? <Link to={`/student/${progressReport.student.id}`}>{progressReport.student.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/progress-report/${progressReport.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/progress-report/${progressReport.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/progress-report/${progressReport.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Progress Reports found</div>
        )}
      </div>
    </div>
  );
};

export default ProgressReport;
