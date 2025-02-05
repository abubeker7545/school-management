import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync, faPlus } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './administrator.reducer';
import Sidebar from 'app/shared/layout/sidebar/Sidebar';

const Administrator: React.FC = () => {
  const dispatch = useAppDispatch();
  const administratorList = useAppSelector((state) => state.administrator.entities);
  const loading = useAppSelector((state) => state.administrator.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, [dispatch]);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar onSelect={function (option: string): void {
        throw new Error('Function not implemented.');
      } } onLogout={function (): void {
        throw new Error('Function not implemented.');
      } } onProfileClick={function (): void {
        throw new Error('Function not implemented.');
      } } onSettingsClick={function (): void {
        throw new Error('Function not implemented.');
      } } />

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, bgcolor: '#f9f9f9' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h2" color="textPrimary">
            Administrators
          </Typography>
          <Box>
            <Button
              onClick={handleSyncList}
              variant="outlined"
              startIcon={<FontAwesomeIcon icon={faSync} />}
              disabled={loading}
              sx={{ mr: 2 }}
            >
              Refresh List
            </Button>
            <Button
              component={Link}
              to="/administrator/new"
              variant="contained"
              color="primary"
              startIcon={<FontAwesomeIcon icon={faPlus} />}
            >
              Create New
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Person</TableCell>
                <TableCell>School</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {administratorList.length > 0 ? (
                administratorList.map((administrator) => (
                  <TableRow key={administrator.id} hover>
                    <TableCell>
                      <Link to={`/administrator/${administrator.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                        {administrator.id}
                      </Link>
                    </TableCell>
                    <TableCell>{administrator.name}</TableCell>
                    <TableCell>{administrator.email}</TableCell>
                    <TableCell>
                      {administrator.person ? (
                        <Link
                          to={`/person/${administrator.person.id}`}
                          style={{ textDecoration: 'none', color: '#1976d2' }}
                        >
                          {administrator.person.id}
                        </Link>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>
                      {administrator.school ? (
                        <Link
                          to={`/school/${administrator.school.id}`}
                          style={{ textDecoration: 'none', color: '#1976d2' }}
                        >
                          {administrator.school.id}
                        </Link>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button
                          component={Link}
                          to={`/administrator/${administrator.id}`}
                          variant="contained"
                          color="info"
                          size="small"
                        >
                          View
                        </Button>
                        <Button
                          component={Link}
                          to={`/administrator/${administrator.id}/edit`}
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Edit
                        </Button>
                        <Button
                          component={Link}
                          to={`/administrator/${administrator.id}/delete`}
                          variant="contained"
                          color="error"
                          size="small"
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No Administrators found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Administrator;
