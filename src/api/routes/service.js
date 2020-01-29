import { Router } from 'express';
import { Container } from 'typedi';
import ServiceManager from '../../services/service';
import { celebrate, Joi } from 'celebrate';
const Logger = require('./loaders/logger').default();
const route = Router();

export default app => {
  app.use('/service', route);
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        price: Joi.required(),
      }),
    }),
    async (req, res, next) => {
      // const logger = Container.get('logger');
      logger.debug('Calling create a subcripton endpoint with body: %o', req.body);
      try {
        const { service } = await ServiceManager.create(req.body);
        return res.status(201).json({ service });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
