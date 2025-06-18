// ...existing code...
/**
 * Modelo de Despesa/Conta a Pagar (exemplo Sequelize)
 */
module.exports = (sequelize, DataTypes) => {
  const Expense = sequelize.define('Expense', {
    description: DataTypes.STRING,
    value: DataTypes.FLOAT
  });
  return Expense;
};
// ...existing code...
