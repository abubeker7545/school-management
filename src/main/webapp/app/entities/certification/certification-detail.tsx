import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './certification.reducer';

export const CertificationDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const certificationEntity = useAppSelector(state => state.certification.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="certificationDetailsHeading">Certification</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{certificationEntity.id}</dd>
          <dt>
            <span id="certificateName">Certificate Name</span>
          </dt>
          <dd>{certificationEntity.certificateName}</dd>
          <dt>
            <span id="issueDate">Issue Date</span>
          </dt>
          <dd>{certificationEntity.issueDate}</dd>
          <dt>
            <span id="expirationDate">Expiration Date</span>
          </dt>
          <dd>{certificationEntity.expirationDate}</dd>
          <dt>
            <span id="certificationUrl">Certification Url</span>
          </dt>
          <dd>{certificationEntity.certificationUrl}</dd>
          <dt>Course</dt>
          <dd>{certificationEntity.course ? certificationEntity.course.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/certification" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/certification/${certificationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default CertificationDetail;
