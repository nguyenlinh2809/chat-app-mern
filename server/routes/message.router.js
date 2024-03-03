import express from 'express';
import { sendMessage, getMessages } from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const messageRouter = express.Router();

messageRouter.post('/send/:userId', protectRoute, sendMessage);
messageRouter.get('/:userId', protectRoute, getMessages);

export default messageRouter;
