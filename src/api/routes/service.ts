import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import ServiceManager from '../../services/service';
import { celebrate, Joi } from 'celebrate';
import { IService } from '../../interfaces/IService';
const route = Router();

export default (app: Router) => {
  app.use('/service', route);
  route.post(
    '/create',
    celebrate({
      body: Joi.object({
        name: Joi.string().required(),
        price: Joi.required(),
        // HERE ADAM YOU NEED TO ENTER THE PARAMETER TO BE ENTERED
      }),
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger = Container.get('logger');
      logger.debug('Calling create a subcripton endpoint with body: %o', req.body);
      try {
        const ServiceMngInstance = Container.get(ServiceManager);
        const { service } = await ServiceMngInstance.create(req.body as IService);
        return res.status(201).json({ service });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );
};
