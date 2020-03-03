module.exports = function(sequelize, DataTypes) {
  var Diningroom = sequelize.define("Diningroom", {
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    availability: {
      type: DataTypes.BOOLEAN,
      defaultValue: '0',
    }
  })
}