import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IAnnouncement } from 'app/shared/model/announcement.model';
import { getEntities } from './announcement.reducer';

export const Announcement = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const announcementList = useAppSelector(state => state.announcement.entities);
  const loading = useAppSelector(state => state.announcement.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="announcement-heading" data-cy="AnnouncementHeading">
        Announcements
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh List
          </Button>
          <Link to="/announcement/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Announcement
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {announcementList && announcementList.length > 0 ? (
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Content</th>
                <th>Creation Date</th>
                <th>Course</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {announcementList.map((announcement, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/announcement/${announcement.id}`} color="link" size="sm">
                      {announcement.id}
                    </Button>
                  </td>
                  <td>{announcement.title}</td>
                  <td>{announcement.content}</td>
                  <td>{announcement.creationDate}</td>
                  <td>{announcement.course ? <Link to={`/course/${announcement.course.id}`}>{announcement.course.id}</Link> : ''}</td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/announcement/${announcement.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/announcement/${announcement.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/announcement/${announcement.id}/delete`}
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
          !loading && <div className="alert alert-warning">No Announcements found</div>
        )}
      </div>
    </div>
  );
};

export default Announcement;
