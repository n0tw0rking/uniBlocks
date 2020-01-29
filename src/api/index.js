import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import subscribtion from './routes/subscribtion';
import agendash from './routes/agendash';
import service from './routes/service';

// guaranteed to get dependencies
export default () => {
  const app = Router();
  auth(app);
  user(app);
  agendash(app);
  subscribtion(app);
  service(app);
  return app;
};
