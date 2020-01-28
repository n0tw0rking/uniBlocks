import { Router, Request, Response } from 'express';
import middlewares from '../middlewares';
const route = Router();
import { Container } from 'typedi';
import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: Request, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });
  route.get('/:id', async (req, res, next) => {
    const logger = Container.get('logger');
    try {
      const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
      console.log(req.params.id);
      const userRecord = await UserModel.findById(req.params.id).populate('Subscribtion');
      if (!userRecord) {
        return res.sendStatus(401);
      }
      const subServices = userRecord.toObject();
      res.json({ subServices }).status(200);
    } catch (e) {
      logger.error('🔥 Error attaching user to req: %o', e);
    }
  });
};
