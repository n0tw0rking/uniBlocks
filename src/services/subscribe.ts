import { Service, Inject } from 'typedi';
import { ISubscribtion, ISubscribtionInputDTO } from '../interfaces/ISubscribtion';
import events from '../subscribers/events';
import { EventDispatcher, EventDispatcherInterface } from '../decorators/eventDispatcher';

@Service()
export default class Subscribe {
  constructor(
    @Inject('subscribtionModel') private subcribtionModel: Models.SubscribtionModel,
    @Inject('logger') private logger,
    @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
  ) {}
  // create a public function CREATE
  public async create(subscribtionInputDTO: ISubscribtionInputDTO): Promise<{ subscription: ISubscribtion }> {
    try {
      this.logger.silly('createing a subscribtion');
      this.logger.silly('Creating subcribtion db record');
      const subcribtionRecord = await this.subcribtionModel.create({
        ...subscribtionInputDTO,
      });
      if (!subcribtionRecord) {
        throw new Error('subscription cannot be created');
      }
      // this.eventDispatcher.dispatch(events.subscribtion.create, { subscribtion: subcribtionRecord });
      const subscription = subcribtionRecord.toObject();

      return { subscription };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
