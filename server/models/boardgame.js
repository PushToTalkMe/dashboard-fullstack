import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Boardgame = sequelize.define(
  'boardgames',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    publishers_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  },
);

Boardgame.associate = (models) => {
  Boardgame.belongsTo(models.Publisher, {
    foreignKey: 'publishers_id',
    as: 'publisher',
  });
};

export { Boardgame };
