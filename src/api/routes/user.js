import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();
import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';

export default app => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req, res) => {
    return res.json({ user: req.currentUser }).status(200);
  });

  route.get('/:id', async (req, res, next) => {
    const logger = Container.get('logger');
    try {
      const UserModel = Container.get('userModel');
      const userRecord = await UserModel.findById(req.params.id).populate('subcribtions');
      if (!userRecord) {
        return res.sendStatus(401);
      }
      const subcribtions = userRecord.toObject();
      res.json({ subcribtions }).status(200);
    } catch (e) {
      logger.error('🔥 Error attaching user to req: %o', e);
    }
  });
};
