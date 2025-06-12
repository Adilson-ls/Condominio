import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="bg-gray-800 text-white w-64 h-full p-4">
            <h2 className="text-2xl font-bold mb-4">Condomínio Conectado</h2>
            <nav>
                <ul>
                    <li className="mb-2">
                        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/profile" className="hover:underline">Perfil</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/settings" className="hover:underline">Configurações</Link>
                    </li>
                    <li className="mb-2">
                        <Link to="/logout" className="hover:underline">Sair</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;