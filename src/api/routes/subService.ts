import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ServiceManager from '../../services/subscribtionService';
import { celebrate, Joi } from 'celebrate';
import { ISubService } from '../../interfaces/ISubService';
const route = Router();

export default (app: Router) => {
  app.use('/sub-service', route);
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        service: Joi.string().required(),
        subscribtion: Joi.string().required(),
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling create a subcripton endpoint with body: %o', req.body);
      try {
        const ServiceMngInstance = Container.get(ServiceManager);
        const { subService } = await ServiceMngInstance.create(req.body as ISubService);
        return res.status(201).json({ subService });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
