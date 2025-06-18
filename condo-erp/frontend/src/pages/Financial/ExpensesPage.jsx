// ...existing code...
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState([]);
  useEffect(() => {
    api.get('/finance/expenses').then(res => setExpenses(res.data));
  }, []);
  return (
    <div>
      <h2>Despesas</h2>
      <ul>
        {expenses.map(e => (
          <li key={e.id}>{e.description} - {e.value}</li>
        ))}
      </ul>
    </div>
  );
};
export default ExpensesPage;
// ...existing code...
