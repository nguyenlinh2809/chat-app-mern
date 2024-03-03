import express from 'express';
import { getAllUser } from '../controllers/user.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const userRouter = express.Router();

userRouter.get('/', protectRoute, getAllUser);

export default userRouter;
