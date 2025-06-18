// ...existing code...
/**
 * Controller para gestão de condomínios
 */
exports.list = (req, res) => {
  res.json([
    { id: 1, name: 'Condomínio Central', address: 'Rua A, 123', cnpj: '00.000.000/0001-00' },
    { id: 2, name: 'Residencial Sol', address: 'Av. B, 456', cnpj: '11.111.111/0001-11' }
  ]);
};
// ...existing code...
