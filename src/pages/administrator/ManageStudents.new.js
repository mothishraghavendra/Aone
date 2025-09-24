import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  TablePagination
} from '@mui/material';
import {
  Edit,
  Delete,
  Search,
  FilterList,
  Group
} from '@mui/icons-material';

// Sample data - replace with API call
const sampleStudents = [
  {
    id: 1,
    name: 'John Doe',
    admissionNo: 'ADM001',
    class: 'X',
    section: 'A',
    contact: '9876543210',
    status: 'Active'
  },
  // Add more sample data for scrolling
  ...Array(50).fill(null).map((_, index) => ({
    id: index + 2,
    name: `Student ${index + 2}`,
    admissionNo: `ADM${String(index + 2).padStart(3, '0')}`,
    class: ['X', 'XI', 'XII'][Math.floor(Math.random() * 3)],
    section: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
    contact: Math.floor(Math.random() * 9000000000) + 1000000000,
    status: Math.random() > 0.8 ? 'Inactive' : 'Active'
  }))
];

const ManageStudents = () => {
  const [students] = useState(sampleStudents);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const filteredStudents = students.filter((student) =>
    Object.values(student).some(
      (value) =>
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <Box sx={{ 
      flexGrow: 1, 
      height: 'calc(100vh - 64px)', // Subtract header height
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      p: 3
    }}>
      <Paper sx={{ 
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Fixed Header Section */}
        <Box sx={{ 
          p: 4,
          pb: 2,
          flex: 'none', // Prevent header from shrinking
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Group sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h4">Manage Students</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <TextField
              placeholder="Search students..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearch}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                )
              }}
            />
            <Box>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                sx={{ mr: 2 }}
              >
                Filter
              </Button>
              <Button
                variant="contained"
                onClick={() => {/* Navigate to add student */}}
              >
                Add Student
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Scrollable Content Section */}
        <Box sx={{ 
          flex: 1,
          overflow: 'auto',
          minHeight: 0, // Important for nested flex scroll
          px: 4,
          '&::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
            '&:hover': {
              background: '#666',
            },
          },
        }}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Name</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Admission No</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Class</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Section</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Contact</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Status</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow 
                      key={student.id}
                      sx={{ 
                        '&:hover': { bgcolor: 'action.hover' },
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.admissionNo}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.contact}</TableCell>
                      <TableCell>
                        <Chip
                          label={student.status}
                          color={student.status === 'Active' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => {/* Handle edit */}}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => {/* Handle delete */}}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Fixed Footer Section */}
        <Box sx={{ 
          p: 2,
          flex: 'none',
          bgcolor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider'
        }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredStudents.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ManageStudents;