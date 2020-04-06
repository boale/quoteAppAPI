const { TestMind } = require('@mindjs/testing');

const { QuoteService } =require('../services');
const { mockQuoteServiceProvider } =require('../services/quote.service.mock');

const GetRandomByTagHandlerResolver = require('./get-random-by-tag.handler.resolver');

describe('GetRandomByTagHandlerResolver', () => {
  let handlerResolver;

  beforeEach(async () => {
    await TestMind.configureTestingModule({
      providers: [
        GetRandomByTagHandlerResolver,
        mockQuoteServiceProvider,
      ]
    });

    handlerResolver = await TestMind.get(GetRandomByTagHandlerResolver);
  });

  it('should be created', () => {
    expect(handlerResolver).toBeDefined();
  });

  it('should have a resolve method', () => {
    expect(handlerResolver.resolve).toBeDefined();
    expect(handlerResolver.resolve).toBeInstanceOf(Function);
  });

  describe('handler', () => {
    let handler;

    beforeEach(async () => {
      handler = await handlerResolver.resolve();
    });

    it('should be resolved', () => {
      expect(handler).toBeDefined();
      expect(handler).toBeInstanceOf(Function);
    });

    it('should set to ctx\'s body a random quote taken by tag', async () => {
      const testQuote = { text: 'test', author: 'testAuthor' };
      const testQuote1 = { text: 'test1', author: 'testAuthor1' };
      const testTag = 'testTag';
      const testCtx = {
        request: {
          query: {
            tag: testTag,
          },
        },
      };
      const testCtx1 = {
        request: {
          query: {},
        },
      };

      const quoteService = await TestMind.get(QuoteService);
      const spy = spyOn(quoteService, 'getRandomByTag').and
        .returnValues(Promise.resolve(testQuote), Promise.resolve(testQuote1));
      const nextFnSpy = jasmine.createSpy('nextFn');

      await handler(testCtx, nextFnSpy);
      expect(spy).toHaveBeenCalledWith(testTag);
      expect(testCtx.body).toEqual(testQuote);
      expect(nextFnSpy).not.toHaveBeenCalled();

      await handler(testCtx1, nextFnSpy);
      expect(spy).toHaveBeenCalledWith('');
      expect(testCtx1.body).toEqual(testQuote1);
      expect(nextFnSpy).not.toHaveBeenCalled();
    });
  });

});
