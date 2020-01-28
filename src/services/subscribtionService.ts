import { Service, Inject } from 'typedi';
import { ISubService, ISubServiceInputDTO } from '../interfaces/ISubService';

@Service()
export default class ServiceManager {
  constructor(
    @Inject('subServiceModel') private subServiceModel: Models.SubServiceModel,
    @Inject('logger') private logger,
  ) {}
  public async create(subServiceInputDTO: ISubServiceInputDTO): Promise<{ subService: ISubService }> {
    try {
      this.logger.silly('createing a subscribtion service');
      this.logger.silly('Creating subscribtion Service db record');
      const subServiceRecord = await this.subServiceModel.create({
        ...subServiceInputDTO,
      });
      if (!subServiceRecord) {
        throw new Error('subscribtion service cannot be created');
      }
      this.logger.silly('subscribtion service created!');
      const subService = subServiceRecord.toObject();
      return { subService };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
