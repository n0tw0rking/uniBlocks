import { Service, Inject } from 'typedi';
import { IService, IServiceInputDTO } from '../interfaces/IService';

@Service()
export default class ServiceManager {
  constructor(@Inject('serviceModel') private serviceModel: Models.ServiceModel, @Inject('logger') private logger) {}
  public async create(serviceInputDTO: IServiceInputDTO): Promise<{ service: IService }> {
    try {
      this.logger.silly('createing a service');
      this.logger.silly('Creating service db record');
      const serviceRecord = await this.serviceModel.create({
        ...serviceInputDTO,
      });
      if (!serviceRecord) {
        throw new Error('service cannot be created');
      }
      this.logger.silly('service created!');
      const service = serviceRecord.toObject();
      return { service };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }
}
