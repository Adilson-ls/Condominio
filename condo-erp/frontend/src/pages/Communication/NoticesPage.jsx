// ...existing code...
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  useEffect(() => {
    api.get('/communication/notices').then(res => setNotices(res.data));
  }, []);
  return (
    <div>
      <h2>Avisos</h2>
      <ul>
        {notices.map(n => (
          <li key={n.id}>{n.title} - {n.content}</li>
        ))}
      </ul>
    </div>
  );
};
export default NoticesPage;
// ...existing code...
