// ...existing code...
/**
 * Controller para unidades/moradores
 */
exports.list = (req, res) => {
  res.json([
    { id: 1, unit: '101', resident: 'João Silva' },
    { id: 2, unit: '202', resident: 'Maria Souza' }
  ]);
};
// ...existing code...
