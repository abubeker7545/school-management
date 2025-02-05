import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBoardMember } from 'app/shared/model/board-member.model';
import { getEntities } from './board-member.reducer';

export const BoardMember = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const boardMemberList = useAppSelector(state => state.boardMember.entities);
  const loading = useAppSelector(state => state.boardMember.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="board-member-heading" data-cy="BoardMemberHeading">
        Board Members
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/board-member/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Board Member
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {boardMemberList && boardMemberList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Member Name</th>
                <th>Position</th>
                <th>Joining Date</th>
                <th>Board</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {boardMemberList.map((boardMember, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/board-member/${boardMember.id}`} color="link" size="sm">
                      {boardMember.id}
                    </Button>
                  </td>
                  <td>{boardMember.memberName}</td>
                  <td>{boardMember.position}</td>
                  <td>{boardMember.joiningDate}</td>
                  <td>
                    {boardMember.board ? <Link to={`/administrative-board/${boardMember.board.id}`}>{boardMember.board.id}</Link> : ''}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/board-member/${boardMember.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/board-member/${boardMember.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/board-member/${boardMember.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Board Members found</div>
        )}
      </div>
    </div>
  );
};

export default BoardMember;
