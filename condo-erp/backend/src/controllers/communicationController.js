// ...existing code...
/**
 * Controller para avisos e ocorrências
 */
exports.notices = (req, res) => {
  res.json([
    { id: 1, title: 'Reunião Extraordinária', content: 'Dia 20/06 às 19h.' },
    { id: 2, title: 'Manutenção Elevador', content: 'Elevador parado dia 22/06.' }
  ]);
};

exports.occurrences = (req, res) => {
  res.json([
    { id: 1, description: 'Vazamento no bloco B', status: 'aberto' },
    { id: 2, description: 'Barulho após horário', status: 'resolvido' }
  ]);
};
// ...existing code...
