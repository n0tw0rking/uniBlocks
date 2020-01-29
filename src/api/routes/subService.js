import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ServiceManager from '../../services/subscribtionService';
import { celebrate, Joi } from 'celebrate';
import { ISubService } from '../../interfaces/ISubService';
const route = Router();

export default app => {
  app.use('/sub-service', route);
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        service: Joi.string().required(),
        subscribtion: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      const logger = Container.get('logger');
      logger.debug('Calling create a subcripton endpoint with body: %o', req.body);
      try {
        const ServiceMngInstance = Container.get(ServiceManager);
        const { subService } = await ServiceMngInstance.create(req.body);
        return res.status(201).json({ subService });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
