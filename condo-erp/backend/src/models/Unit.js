// ...existing code...
/**
 * Modelo de Unidade (exemplo Sequelize)
 */
module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define('Unit', {
    unit: DataTypes.STRING,
    resident: DataTypes.STRING
  });
  return Unit;
};
// ...existing code...
