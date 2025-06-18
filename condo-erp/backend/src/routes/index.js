const express = require('express');
const router = express.Router();

// Exemplo de rota pública
router.get('/', (req, res) => {
  res.json({ message: 'API Condo-ERP rodando!' });
});

// Aqui você pode importar e usar outros módulos de rotas
router.use('/auth', require('./authRoutes'));
router.use('/condominiums', require('./condoRoutes'));
router.use('/units', require('./unitRoutes'));
router.use('/finance', require('./financeRoutes'));
router.use('/communication', require('./communicationRoutes'));

module.exports = router;
