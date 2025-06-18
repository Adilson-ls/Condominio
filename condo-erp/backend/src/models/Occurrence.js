// ...existing code...
/**
 * Modelo de Ocorrência (exemplo Sequelize)
 */
module.exports = (sequelize, DataTypes) => {
  const Occurrence = sequelize.define('Occurrence', {
    description: DataTypes.STRING,
    status: DataTypes.STRING
  });
  return Occurrence;
};
// ...existing code...
