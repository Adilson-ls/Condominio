import React from 'react';
import { Link } from 'react-router-dom';

const MobileNavbar: React.FC = () => {
    return (
        <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
            <div className="max-w-screen-xl mx-auto px-4 py-2 flex justify-between items-center">
                <div className="text-xl font-bold">
                    <Link to="/">Condomínio Conectado</Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/login" className="text-gray-700 hover:text-blue-500">Login</Link>
                    <Link to="/register" className="text-gray-700 hover:text-blue-500">Registrar</Link>
                </div>
            </div>
        </nav>
    );
};

export default MobileNavbar;