import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './board-member.reducer';

export const BoardMemberDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const boardMemberEntity = useAppSelector(state => state.boardMember.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="boardMemberDetailsHeading">BoardMember</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{boardMemberEntity.id}</dd>
          <dt>
            <span id="memberName">Member Name</span>
          </dt>
          <dd>{boardMemberEntity.memberName}</dd>
          <dt>
            <span id="position">Position</span>
          </dt>
          <dd>{boardMemberEntity.position}</dd>
          <dt>
            <span id="joiningDate">Joining Date</span>
          </dt>
          <dd>{boardMemberEntity.joiningDate}</dd>
          <dt>Board</dt>
          <dd>{boardMemberEntity.board ? boardMemberEntity.board.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/board-member" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/board-member/${boardMemberEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BoardMemberDetail;
