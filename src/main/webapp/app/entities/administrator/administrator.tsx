import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from './administrator.reducer';
import Sidebar from 'app/shared/layout/sidebar/Sidebar';
import DynamicMuiTable from 'app/shared/components/Dashboard/DynamicMuiTable';
import CalendarWithEvents from 'app/shared/components/Dashboard/CalendarWithEvents';
import SchoolOverviewCard from 'app/shared/components/Dashboard/SchoolOverviewCard';
import PaymentOverview from 'app/shared/components/Dashboard/PaymentOverview';

const Administrator: React.FC = () => {
  const dispatch = useAppDispatch();
  const administratorList = useAppSelector((state) => state.administrator.entities);
  const loading = useAppSelector((state) => state.administrator.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, [dispatch]);

  const tabs = [
    { label: "Users", key: "users" },
    { label: "Orders", key: "orders" },
  ];

  const data = {
    users: [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ],
    orders: [
      { orderId: 101, product: "Laptop", price: "$1200" },
      { orderId: 102, product: "Phone", price: "$800" },
    ],
  };

  const [events, setEvents] = useState<{ date: string; event: string }[]>([
    { date: '2025-02-02', event: 'Meeting with client' },
    { date: '2025-02-05', event: 'Project deadline' },
    { date: '2025-02-10', event: 'Team building activity' },
  ]);
  const [paymentData] = useState([100000, 120000, 95000, 110000, 125000]); // Payments over 5 months
  const [paymentLabels] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May']); // Months for x-axis

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <Sidebar onSelect={() => { }} onLogout={() => { }} onProfileClick={() => { }} onSettingsClick={() => { }} />

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, bgcolor: '#f9f9f9' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h2" color="textPrimary">
            Administrators
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={7}>
                  <Grid container spacing={2} direction="column" alignItems="stretch">
                    <Grid item xs={6}>
                      {/* School Overview Card */}
                      <Box sx={{ width: '100%', minWidthHeight: 400 }}>
                        <SchoolOverviewCard
                          totalStudents={1200}
                          totalTeachers={100}
                          totalBranches={5}
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={6}>
                      {/* Payment Overview */}
                      <Box sx={{ width: '100%', maxHeight: "30%" }}>
                        <PaymentOverview
                          totalPayments={1000000}
                          pendingFees={200000}
                          paymentData={paymentData}
                          paymentLabels={paymentLabels}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>




                <Grid item xs={4}>
                  {/* Dynamic Table */}
                  <Box>
                    <DynamicMuiTable
                      tabs={tabs}
                      data={data}
                      onEdit={() => { }}
                      onDelete={() => { }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              {/* Calendar with Events */}
              <Box sx={{ width: 400 }}>
                <CalendarWithEvents
                  events={events}
                  onAddEvent={(newEvent) => setEvents([...events, newEvent])}
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Administrator;
