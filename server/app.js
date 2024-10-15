import 'dotenv/config';
import express from 'express';
import pkg from 'body-parser';
import cors from 'cors';
import { sequelize } from './config/db.js';
import { publishersRouter } from './routes/publishers-routes.js';
import { boardgamesRouter } from './routes/boardgames-routes.js';

const { json } = pkg;
const app = express();
const PORT = process.env.PORT || 3000;

app.use(json());
app.use(cors());
app.use('/api', boardgamesRouter, publishersRouter);

sequelize
  .authenticate()
  .then(() => {
    console.log('Успешное соединение с базой данных');
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Невозможно соединиться с базой данных:', err);
  });
