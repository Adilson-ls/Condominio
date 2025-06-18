// ...existing code...
/**
 * Modelo de Aviso (exemplo Sequelize)
 */
module.exports = (sequelize, DataTypes) => {
  const Notice = sequelize.define('Notice', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT
  });
  return Notice;
};
// ...existing code...
