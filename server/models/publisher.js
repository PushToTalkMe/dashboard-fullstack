import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Publisher = sequelize.define(
  'publishers',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    foundation_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tin: {
      type: DataTypes.DECIMAL(12, 0),
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  },
);

Publisher.associate = (models) => {
  Publisher.hasMany(models.Boardgame, {
    as: 'boardgames',
    foreignKey: 'publishers_id',
  });
};

export { Publisher };
