const { TestMind } = require('@mindjs/testing');

const QuoteModule = require('./quote.module');

describe('QuoteModule', () => {

  beforeEach(async () => {
    await TestMind.configureTestingModule({
      imports: [ QuoteModule ],
    });
  });

  it('should be created', async () => {
    const module = await TestMind.get(QuoteModule);
    expect(module).toBeDefined();
  });
});
