const { TestMind } = require('@mindjs/testing');

const { QUOTESY } = require('../DI.tokens');

const { mockQuotesyProvider } = require('./quote.service.mock');

const QuoteService = require('./quote.service');

describe('QuoteService', () => {
  let service;

  beforeEach(async () => {
    await TestMind.configureTestingModule({
      providers: [
        QuoteService,
        mockQuotesyProvider,
      ],
    });

    service = await TestMind.get(QuoteService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });

  describe('Instance methods', () => {
    let quotesyProvider;
    const testQuote = { text: 'test quote text', author: 'test' };
    const testJson = [ testQuote ];

    beforeEach(async () => {
      quotesyProvider = await TestMind.get(QUOTESY);
    });

    it('should getRandom by calling quotesy\'s random method', async () => {
      const spy = spyOn(quotesyProvider, 'random').and.returnValue(Promise.resolve(testQuote));
      const result = await service.getRandom();

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(testQuote);
    });

    it('should getAll by calling quotesy\'s parse_json method', async () => {
      const spy = spyOn(quotesyProvider, 'parse_json').and.returnValue(Promise.resolve(testJson));

      const result = await service.getAll();

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(testJson);
    });

    it('should getRandomByTag by calling quotesy\'s random_by_tag method', async () => {
      const testTag = 'tag';
      const spy = spyOn(quotesyProvider, 'random_by_tag').and.returnValue(Promise.resolve(testQuote));

      const result = await service.getRandomByTag(testTag);

      expect(spy).toHaveBeenCalledWith(testTag);
      expect(result).toEqual(testQuote);
    });

  });

});
