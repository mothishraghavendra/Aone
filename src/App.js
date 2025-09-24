import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Layout from './components/layout/Layout';
import StudentLayout from './components/student/StudentLayout';
import AdminLayout from './components/administrator/AdminLayout';
import Login from './pages/Login';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import AddStudent from './pages/administrator/AddStudent';
import ManageStudents from './pages/administrator/ManageStudents';

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
    },
    secondary: {
      main: '#4285f4',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

            {/* Protected Routes */}
            <Route 
              path="/admin/*" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminLayout>
                    <Routes>
                      <Route path="dashboard" element={<AdminDashboard />} />
                      <Route path="students">
                        <Route path="add" element={<AddStudent />} />
                        <Route path="manage" element={<ManageStudents />} />
                      </Route>
                      {/* Add more admin routes here */}
                    </Routes>
                  </AdminLayout>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/principal/dashboard/*" 
              element={
                <ProtectedRoute requiredRole="principal">
                  <Layout />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/warden/dashboard/*" 
              element={
                <ProtectedRoute requiredRole="warden">
                  <Layout />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/student/dashboard/*" 
              element={
                <ProtectedRoute requiredRole="student">
                  <StudentLayout />
                </ProtectedRoute>
              } 
            />

            {/* Default Route - Redirect to Login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
