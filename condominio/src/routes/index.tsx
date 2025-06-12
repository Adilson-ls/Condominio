import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import LoginScreen from '../modules/Auth/screens/LoginScreen';
import RegisterScreen from '../modules/Auth/screens/RegisterScreen';
import ForgotPasswordScreen from '../modules/Auth/screens/ForgotPasswordScreen';
import Dashboard from '../modules/Dashboard'; // Placeholder for the Dashboard component

const AppRoutes: React.FC = () => {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/register" element={<RegisterScreen />} />
                        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
                    </Route>
                    <Route element={<PrivateRoutes />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </Router>
    );
};

export default AppRoutes;