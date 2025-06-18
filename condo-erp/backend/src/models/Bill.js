// ...existing code...
/**
 * Modelo de Boleto/Conta a Receber (exemplo Sequelize)
 */
module.exports = (sequelize, DataTypes) => {
  const Bill = sequelize.define('Bill', {
    description: DataTypes.STRING,
    value: DataTypes.FLOAT,
    status: DataTypes.STRING
  });
  return Bill;
};
// ...existing code...
