import express from 'express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import cors from 'cors';

import homeRouter from './routes/home.routes.js';
import userRoutes from './routes/user.routes.js';
import projectRoutes from './routes/project.routes.js';
import categoryRoutes from './routes/category.routes.js';
import taskRoutes from './routes/task.routes.js';

const app = express();
app.use(express.json());
app.use(ExpressMongoSanitize());
app.use(compression());
app.use(cors());

app.use('/', homeRouter);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/tasks', taskRoutes);

//prevent favicon error
app.get('/favicon.ico', (req, res) => res.status(204));

// //routes not found
// app.all('*', (req, res, next) => {
//     return next(new AppError(`Cant find ${req.originalUrl} on this server.`));
// });

app.use(notFound);
app.use(errorHandler);

export default app;
