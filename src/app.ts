import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bookRoutes from '../src/app/routes/books.routes';
import borrowRoutes from '../src/app/routes/borrows.routes';
import errorHandler from './app/middlewares/errorHandler';
const app: Application = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

// ✅ Routes
app.use('/api', bookRoutes);
app.use('/api', borrowRoutes);

// ✅ Error handling middleware
app.use(errorHandler);

// Test route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to library');
});

export default app;
