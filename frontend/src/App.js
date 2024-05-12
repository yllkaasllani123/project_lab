import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HotelManagement from './pages/HotelManagement';
import PrivateRoutes from './PrivateRoutes';
import {theme} from "./themes/default";
import {ThemeProvider} from "@mui/material";
import RegisterPage from './pages/RegisterPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<HotelManagement/>} path="/hotel-management"/>
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
