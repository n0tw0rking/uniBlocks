import { Container } from 'typedi';
import { EventSubscriber, On } from 'event-dispatch';
import events from './events';
import { ISubscribtion } from '../interfaces/ISubscribtion';
import mongoose from 'mongoose';

@EventSubscriber()
export default class SubscriptionSubscriber {
  @On(events.subscribtion.create)
  public onSubscriptionCreate({ _id }: Partial<ISubscribtion>) {
    const Logger = Container.get('logger');
    try {
      const SubscriptionModel = Container.get('SubscriptionModel') as mongoose.Model<ISubscribtion & mongoose.Document>;
      SubscriptionModel.create({});
    } catch (e) {
      Logger.error(`🔥 Error on event ${events.subscribtion.create}: %o`, e);
      throw e;
    }
  }
}
