import { Sequelize } from 'sequelize';

const DB = process.env.DB || 'dashboard';
const DB_DIALECT = process.env.DB_DIALECT || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || '5432';
const DB_USERNAME = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'postgres';

const sequelize = new Sequelize(DB, DB_USERNAME, DB_PASSWORD, {
  dialect: DB_DIALECT,
  host: DB_HOST,
  port: DB_PORT,
});

export { sequelize };
