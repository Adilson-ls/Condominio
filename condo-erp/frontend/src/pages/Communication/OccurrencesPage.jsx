// ...existing code...
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const OccurrencesPage = () => {
  const [occurrences, setOccurrences] = useState([]);
  useEffect(() => {
    api.get('/communication/occurrences').then(res => setOccurrences(res.data));
  }, []);
  return (
    <div>
      <h2>Ocorrências</h2>
      <ul>
        {occurrences.map(o => (
          <li key={o.id}>{o.description} - {o.status}</li>
        ))}
      </ul>
    </div>
  );
};
export default OccurrencesPage;
// ...existing code...
