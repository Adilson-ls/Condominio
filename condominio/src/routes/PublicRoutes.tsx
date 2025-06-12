import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicRoutes: React.FC = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return null; // ou um esqueleto de carregamento, dependendo da UX desejada para rotas públicas
    }

    return !currentUser ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default PublicRoutes;