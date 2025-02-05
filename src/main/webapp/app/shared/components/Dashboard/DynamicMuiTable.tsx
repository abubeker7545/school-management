import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Pagination,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

interface TableProps {
  tabs: { label: string; key: string }[];
  data: Record<string, any[]>;
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

const DynamicMuiTable: React.FC<TableProps> = ({ tabs, data, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterKey, setFilterKey] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
    setSearchQuery("");
    setFilterKey("");
  };

  const activeKey = tabs[activeTab]?.key || "";
  const tableData = data[activeKey] || [];
  const columns = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const filteredData = tableData.filter((row) =>
    columns.some((col) =>
      row[col]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <Box sx={{ width: "100%", bgcolor: "#ffffff", p: 3, borderRadius: 2, boxShadow: 3 }}>
      <Box display="flex" gap={3}>
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="primary"
          sx={{ borderRight: 1, borderColor: "divider", minWidth: 150 }}
        >
          {tabs.map((tab, index) => (
            <Tab key={index} label={tab.label} sx={{ fontWeight: "bold", fontSize: "0.9rem" }} />
          ))}
        </Tabs>

        <Box flex={1}>
          <Box display="flex" justifyContent="space-between" gap={2} p={2}>
            <Box display="flex" gap={2}>
              <TextField
                label="Search"
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FontAwesomeIcon icon={faSearch} />
                    </InputAdornment>
                  ),
                }}
              />
              <Select value={filterKey} onChange={(e) => setFilterKey(e.target.value)} displayEmpty size="small" sx={{ minWidth: 150 }}>
                <MenuItem value="">All Columns</MenuItem>
                {columns.map((col) => (
                  <MenuItem key={col} value={col}>{col}</MenuItem>
                ))}
              </Select>
            </Box>
            <Button variant="contained" color="primary" size="small">New</Button>
          </Box>
          <TableContainer component={Paper} sx={{ bgcolor: "#e8f5e9", borderRadius: 2, boxShadow: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#81c784" }}>
                  {columns.map((col) => (
                    <TableCell key={col} sx={{ fontWeight: "bold", color: "white" }}>{col}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} hover>
                    {columns.map((col) => (
                      <TableCell key={col}>{row[col]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={() => setOpenDialog(true)} variant="contained" color="secondary" size="small">
              See More
            </Button>
          </Box>
        </Box>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="lg">
        <DialogTitle>All Data</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper} sx={{ bgcolor: "#e8f5e9", borderRadius: 2, boxShadow: 2 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ bgcolor: "#81c784" }}>
                  {columns.map((col) => (
                    <TableCell key={col} sx={{ fontWeight: "bold", color: "white" }}>{col}</TableCell>
                  ))}
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage).map((row, rowIndex) => (
                  <TableRow key={rowIndex} hover>
                    {columns.map((col) => (
                      <TableCell key={col}>{row[col]}</TableCell>
                    ))}
                    <TableCell>
                      <IconButton color="primary" size="small" onClick={() => onEdit(row)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </IconButton>
                      <IconButton color="secondary" size="small" onClick={() => onDelete(row)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination count={Math.ceil(filteredData.length / rowsPerPage)} page={page} onChange={(_, value) => setPage(value)} sx={{ mt: 2 }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DynamicMuiTable;
