"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.Note, { foreignKey: "note_id" });
    }
  }
  Todo.init(
    {
      done: DataTypes.BOOLEAN,
      order: DataTypes.INTEGER,
      todo: DataTypes.STRING,
      note_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
