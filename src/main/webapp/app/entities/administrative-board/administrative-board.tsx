import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAdministrativeBoard } from 'app/shared/model/administrative-board.model';
import { getEntities } from './administrative-board.reducer';

export const AdministrativeBoard = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const administrativeBoardList = useAppSelector(state => state.administrativeBoard.entities);
  const loading = useAppSelector(state => state.administrativeBoard.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="administrative-board-heading" data-cy="AdministrativeBoardHeading">
        Administrative Boards
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link
            to="/administrative-board/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Administrative Board
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {administrativeBoardList && administrativeBoardList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Creation Date</th>
                <th>Board Head</th>
                <th>Administrators</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {administrativeBoardList.map((administrativeBoard, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/administrative-board/${administrativeBoard.id}`} color="link" size="sm">
                      {administrativeBoard.id}
                    </Button>
                  </td>
                  <td>{administrativeBoard.name}</td>
                  <td>{administrativeBoard.description}</td>
                  <td>{administrativeBoard.creationDate}</td>
                  <td>{administrativeBoard.boardHead}</td>
                  <td>
                    {administrativeBoard.administrators
                      ? administrativeBoard.administrators.map((val, j) => (
                          <span key={j}>
                            <Link to={`/administrator/${val.id}`}>{val.id}</Link>
                            {j === administrativeBoard.administrators.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/administrative-board/${administrativeBoard.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/administrative-board/${administrativeBoard.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/administrative-board/${administrativeBoard.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Administrative Boards found</div>
        )}
      </div>
    </div>
  );
};

export default AdministrativeBoard;
