const ServiceModel = require('../models/service').default();
const logger = require('../loaders/logger');
export default class ServiceManager {
  async create(service) {
    try {
      logger.silly('createing a service');
      logger.silly('Creating service db record');
      const serviceRecord = await serviceModel.create({
        service,
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
