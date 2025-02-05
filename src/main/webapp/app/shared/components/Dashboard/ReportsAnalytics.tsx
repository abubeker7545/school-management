import React from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ReportsAnalyticsProps {
  attendanceRate: number;
  averageGrades: number;
  feeCollectionRate: number;
  attendanceData: number[];
}

const ReportsAnalytics: React.FC<ReportsAnalyticsProps> = ({
  attendanceRate,
  averageGrades,
  feeCollectionRate,
  attendanceData,
}) => {
  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Attendance',
        data: attendanceData,
        backgroundColor: 'rgba(25, 118, 210, 0.6)',
      },
    ],
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, padding: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Reports and Analytics</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography variant="h5">{attendanceRate}%</Typography>
              <Typography variant="body2">Attendance Rate</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography variant="h5">{averageGrades}</Typography>
              <Typography variant="body2">Average Grades</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box>
              <Typography variant="h5">{feeCollectionRate}%</Typography>
              <Typography variant="body2">Fee Collection Rate</Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Attendance Chart */}
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Attendance over the Last Month</Typography>
          <Bar data={chartData} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReportsAnalytics;
