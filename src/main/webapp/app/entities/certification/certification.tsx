import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICertification } from 'app/shared/model/certification.model';
import { getEntities } from './certification.reducer';

export const Certification = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const certificationList = useAppSelector(state => state.certification.entities);
  const loading = useAppSelector(state => state.certification.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="certification-heading" data-cy="CertificationHeading">
        Certifications
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/certification/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Certification
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {certificationList && certificationList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Certificate Name</th>
                <th>Issue Date</th>
                <th>Expiration Date</th>
                <th>Certification Url</th>
                <th>Course</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {certificationList.map((certification, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/certification/${certification.id}`} color="link" size="sm">
                      {certification.id}
                    </Button>
                  </td>
                  <td>{certification.certificateName}</td>
                  <td>{certification.issueDate}</td>
                  <td>{certification.expirationDate}</td>
                  <td>{certification.certificationUrl}</td>
                  <td>{certification.course ? <Link to={`/course/${certification.course.id}`}>{certification.course.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/certification/${certification.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/certification/${certification.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/certification/${certification.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Certifications found</div>
        )}
      </div>
    </div>
  );
};

export default Certification;
