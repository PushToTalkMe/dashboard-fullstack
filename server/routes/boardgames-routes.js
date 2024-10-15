import { Router } from 'express';
import {
  createBoardgame,
  getBoardgames,
  getBoardgameById,
  updateBoardgame,
  deleteBoardgame,
} from '../controllers/boardgames-controller.js';

const boardgamesRouter = Router();

boardgamesRouter.post('/boardgames', createBoardgame);
boardgamesRouter.get('/boardgames', getBoardgames);
boardgamesRouter.get('/boardgames/:id', getBoardgameById);
boardgamesRouter.put('/boardgames/:id', updateBoardgame);
boardgamesRouter.delete('/boardgames/:id', deleteBoardgame);

export { boardgamesRouter };
