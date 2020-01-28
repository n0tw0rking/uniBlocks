import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import SubscribeService from '../../services/subscribe';
import { celebrate, Joi } from 'celebrate';
import { ISubscribtionInputDTO } from '../../interfaces/ISubscribtion';
const route = Router();
import { IUser } from '../../interfaces/IUser';
import mongoose from 'mongoose';

export default (app: Router) => {
  app.use('/subs', route);
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        user: Joi.string().required(),
        // HERE ADAM YOU NEED TO ENTER THE PARAMETER TO BE ENTERED
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling create a subcripton endpoint with body: %o', req.body);
      try {
        const SubscribeServiceInstance = Container.get(SubscribeService);
        const { subscription } = await SubscribeServiceInstance.create(req.body as ISubscribtionInputDTO);
        const UserModel = Container.get('userModel') as mongoose.Model<IUser & mongoose.Document>;
        const id = { id: subscription._id };
        console.log(subscription);
        UserModel.findByIdAndUpdate(
          { subscription },
          {
            $push: { subcribtions: { id } },
          },
          { new: true },
        );
        return res.status(201).json({ subscription });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
