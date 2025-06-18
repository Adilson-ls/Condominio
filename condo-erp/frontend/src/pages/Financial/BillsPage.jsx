// ...existing code...
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const BillsPage = () => {
  const [bills, setBills] = useState([]);
  useEffect(() => {
    api.get('/finance/bills').then(res => setBills(res.data));
  }, []);
  return (
    <div>
      <h2>Boletos</h2>
      <ul>
        {bills.map(b => (
          <li key={b.id}>{b.description} - {b.value} - {b.status}</li>
        ))}
      </ul>
    </div>
  );
};
export default BillsPage;
// ...existing code...
