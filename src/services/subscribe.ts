import { Service, Inject } from 'typedi';
import { ISubscribtion, ISubscribtionInputDTO } from '../interfaces/ISubscribtion';
import events from '../subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';

@Service()
export default class SubscribeService {
  constructor(
    @Inject('subscribtionModel') private subscribtionModel: Models.SubscribtionModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}
  public async create(subscribtionInputDTO: ISubscribtionInputDTO): Promise<{ subscription: ISubscribtion }> {
    try {
      this.logger.silly('createing a subscribtion');
      this.logger.silly('Creating subcribtion db record');
      const subcribtionRecord = await this.subscribtionModel.create({
        ...subscribtionInputDTO,
      });
      if (!subcribtionRecord) {
        throw new Error('subscription cannot be created');
      }
      // this.eventDispatcher.dispatch(events.subscribtion.create, { subscribtion: subcribtionRecord });
      const { subscription } = subcribtionRecord.toObject();
      const user = subcribtionRecord.user;

      return { subscription };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
    // public async get(subscribtionInputDTO: ISubscribtionInputDTO): Promise<{ subscription: ISubscribtion }> {
    //   try{

    //   }
    //   catch{

    //   }
  }
}
