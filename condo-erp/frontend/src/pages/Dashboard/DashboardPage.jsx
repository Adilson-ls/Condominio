// ...existing code...
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const DashboardPage = () => {
  const [condos, setCondos] = useState([]);
  useEffect(() => {
    api.get('/condominiums').then(res => setCondos(res.data));
  }, []);
  return (
    <div>
      <h2>Condomínios</h2>
      <ul>
        {condos.map(c => (
          <li key={c.id}>{c.name} - {c.address}</li>
        ))}
      </ul>
    </div>
  );
};
export default DashboardPage;
// ...existing code...
