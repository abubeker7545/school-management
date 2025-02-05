import React from "react";
import { Card, CardContent, Typography, Grid, Box, Divider } from "@mui/material";
import { School, Group, AccountBalance } from "@mui/icons-material";

interface SchoolOverviewProps {
  totalStudents: number;
  totalTeachers: number;
  totalBranches: number;
}

const SchoolOverviewCard: React.FC<SchoolOverviewProps> = ({
  totalStudents,
  totalTeachers,
  totalBranches,
}) => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3, padding: 2, bgcolor: "#f8f9fa", ':hover': { boxShadow: 5 } }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          School Overview
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          {[{
            label: "Total Students",
            value: totalStudents,
            icon: <School sx={{ fontSize: 36, color: "#1976d2" }} />
          }, {
            label: "Total Teachers",
            value: totalTeachers,
            icon: <Group sx={{ fontSize: 36, color: "#1976d2" }} />
          }, {
            label: "Total Branches",
            value: totalBranches,
            icon: <AccountBalance sx={{ fontSize: 36, color: "#1976d2" }} />
          }].map((item, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                {item.icon}
                <Typography variant="h5" fontWeight={700} mt={1}>
                  {item.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" fontWeight={500}>
                  {item.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SchoolOverviewCard;
