import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
  Button,
  IconButton,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Edit,
  Delete,
  Search,
  FilterList,
  Group
} from '@mui/icons-material';
import axios from 'axios';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/students');
      setStudents(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching students:', error);
      setLoading(false);
    }
  };

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
      (value) => value && value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      flexGrow: 1, 
      height: 'calc(100vh - 64px)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <Paper sx={{ 
        p: 4,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}>
        {/* Fixed Header Section */}
        <Box sx={{ 
          flex: 'none',
          mb: 2 
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Group sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h4">Manage Students</Typography>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
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
          minHeight: 0,
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
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Roll Number</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Name</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Class</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Section</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Father's Name</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Mother's Name</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }}>Date of Birth</TableCell>
                  <TableCell sx={{ bgcolor: 'background.paper' }} align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student) => (
                    <TableRow 
                      key={student.roll_number}
                      sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                    >
                      <TableCell>{student.roll_number}</TableCell>
                      <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.section}</TableCell>
                      <TableCell>{student.father_name}</TableCell>
                      <TableCell>{student.mother_name}</TableCell>
                      <TableCell>{new Date(student.date_of_birth).toLocaleDateString()}</TableCell>
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
        <Box sx={{ flex: 'none', mt: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
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