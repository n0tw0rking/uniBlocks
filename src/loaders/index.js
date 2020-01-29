const expressLoader = require('./express');
const dependencyInjectorLoader = require('./dependencyInjector');
const mongooseLoader = require('./mongoose');
const jobsLoader = require('./jobs');
const Logger = require('./logger');

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  /**
   * WTF is going on here?
   *
   * We are injecting the mongoose models into the DI container.
   * I know this is controversial but will provide a lot of flexibility at the time
   * of writing unit tests, just go and check how beautiful they are!
   */

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default'
    model: require('../models/user').default,
  };
  const subscribtionModel = {
    name: 'subscribtionModel',
    model: require('../models/subscribtion').default,
  };
  const serviceModel = {
    name: 'serviceModel',
    model: require('../models/service').default,
  };
  const SubServiceModel = {
    name: 'subServiceModel',
    model: require('../models/subService').default,
  };
  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = await dependencyInjectorLoader({
    mongoConnection,
    models: [userModel, subscribtionModel, serviceModel, SubServiceModel],
  });
  Logger.info('✌️ Dependency Injector loaded');

  await jobsLoader({ agenda });
  Logger.info('✌️ Jobs loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
