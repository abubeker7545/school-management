import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { AttachMoney, AccountBalanceWallet } from '@mui/icons-material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface PaymentOverviewProps {
  totalPayments: number;
  pendingFees: number;
  paymentData: number[]; // Payment data for the graph
  paymentLabels: string[]; // Labels for the graph (e.g., months)
}

const PaymentOverview: React.FC<PaymentOverviewProps> = ({
  totalPayments,
  pendingFees,
  paymentData,
  paymentLabels,
}) => {
  // Chart data
  const chartData = {
    labels: paymentLabels,
    datasets: [
      {
        label: 'Payments Made',
        data: paymentData,
        backgroundColor: 'rgba(25, 118, 210, 0.6)',
      },
    ],
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2, padding: 2 }}>
      <CardContent>

        <Box display="flex" justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Box display="flex" alignItems="center">
            <AccountBalanceWallet sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h5" sx={{ marginLeft: 1 }}>
              {pendingFees.toLocaleString()}
            </Typography>
          </Box>
          <Typography variant="body2">Pending Fees</Typography>
        </Box>

        {/* Payments Chart */}
        <Box sx={{ marginTop: 3 }}>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>Payments Over Time</Typography>
          <Bar data={chartData} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default PaymentOverview;
