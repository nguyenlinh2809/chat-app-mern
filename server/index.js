import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import 'dotenv/config.js';
import authRouter from './routes/auth.route.js';
import { connectToMongoDB } from './db/mongo.js';
import messageRouter from './routes/message.router.js';
import userRouter from './routes/user.route.js';
import { app, server } from './socket/socket.js';

const PORT = process.env.PORT || 5000;

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/users', userRouter);

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectToMongoDB();
});
