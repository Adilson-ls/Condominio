import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    return (
        <header className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold">Condomínio Conectado</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li>
                            <Link to="/" className="hover:underline">Home</Link>
                        </li>
                        <li>
                            <Link to="/login" className="hover:underline">Login</Link>
                        </li>
                        <li>
                            <Link to="/register" className="hover:underline">Registrar</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;