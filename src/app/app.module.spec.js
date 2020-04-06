const { TestMind } = require('@mindjs/testing');

const AppModule = require('./app.module');

describe('AppModule', () => {

  beforeEach(async () => {
    await TestMind.configureTestingModule({
      imports: [ AppModule ],
    });
  });

  it('should be created', async () => {
    const module = await TestMind.get(AppModule);
    expect(module).toBeDefined();
  });
});
