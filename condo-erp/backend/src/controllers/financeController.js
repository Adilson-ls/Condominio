// ...existing code...
/**
 * Controller para boletos e despesas
 */
exports.bills = (req, res) => {
  res.json([
    { id: 1, description: 'Boleto Junho', value: 350.00, status: 'pago' },
    { id: 2, description: 'Boleto Julho', value: 350.00, status: 'pendente' }
  ]);
};

exports.expenses = (req, res) => {
  res.json([
    { id: 1, description: 'Conta de Luz', value: 120.00 },
    { id: 2, description: 'Limpeza', value: 80.00 }
  ]);
};
// ...existing code...
