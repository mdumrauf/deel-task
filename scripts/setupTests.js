const { seed } = require('./seedDb');

beforeEach(async () => {
  await seed();
  jest.resetAllMocks();
});
