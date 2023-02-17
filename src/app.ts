import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';

const app = express();

app.use(cors());
app.use(json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

export default app
