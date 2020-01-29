import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import SubscribeService from '../../services/subscribe';
import { celebrate, Joi } from 'celebrate';
import { ISubscribtionInputDTO } from '../../interfaces/ISubscribtion';
const route = Router();

export default app => {
  app.use('/subs', route);
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        user: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const logger = Container.get('logger');
      logger.debug('Calling create a subcripton endpoint with body: %o', req.body);
      try {
        const SubscribeServiceInstance = Container.get(SubscribeService);
        const { subscription } = await SubscribeServiceInstance.create(req.body as ISubscribtionInputDTO);
        return res.status(201).json({ subscription });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
