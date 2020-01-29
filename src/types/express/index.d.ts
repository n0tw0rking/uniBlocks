import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { ISubscribtion } from '../../interfaces/ISubscribtion';
import { IService } from '../../interfaces/IService';
import { type } from 'os';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
      // subscription: ISubscribtion & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type SubscribtionModel = Model<ISubscribtion & Document>;
    export type ServiceModel = Model<IService & Document>;
  }
}
