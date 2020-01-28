import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import subscribtion from './routes/subscribtion';
import agendash from './routes/agendash';
import service from './routes/service';
import subService from './routes/subService';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);
  subscribtion(app);
  service(app);
  subService(app);
  return app;
};
