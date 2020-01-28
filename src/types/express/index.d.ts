import { Document, Model } from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import { ISubscribtion } from '../../interfaces/ISubscribtion';
import { IService } from '../../interfaces/IService';
import { ISubService } from '../../interfaces/ISubService';
import { type } from 'os';
declare global {
  namespace Express {
    export interface Request {
      currentUser: IUser & Document;
    }
  }

  namespace Models {
    export type UserModel = Model<IUser & Document>;
    export type SubscribtionModel = Model<ISubscribtion & Document>;
    export type ServiceModel = Model<IService & Document>;
    export type SubServiceModel = Model<ISubService & Document>;
  }
}
