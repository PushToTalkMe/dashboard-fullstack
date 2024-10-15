import { Router } from 'express';
import {
  createPublisher,
  getPublishers,
  getAllPublisherId,
  updatePublisher,
  deletePublisher,
} from '../controllers/publishers-controller.js';

const publishersRouter = Router();

publishersRouter.post('/publishers', createPublisher);
publishersRouter.get('/publishers', getPublishers);
publishersRouter.get('/publisherIds', getAllPublisherId);
publishersRouter.put('/publishers/:id', updatePublisher);
publishersRouter.delete('/publishers/:id', deletePublisher);

export { publishersRouter };
