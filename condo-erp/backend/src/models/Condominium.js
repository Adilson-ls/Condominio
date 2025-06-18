// ...existing code...
/**
 * Modelo de Condomínio (exemplo Sequelize)
 */
module.exports = (sequelize, DataTypes) => {
  const Condominium = sequelize.define('Condominium', {
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    cnpj: DataTypes.STRING
  });
  return Condominium;
};
// ...existing code...
