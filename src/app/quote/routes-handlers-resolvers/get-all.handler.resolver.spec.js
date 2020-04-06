const { TestMind } = require('@mindjs/testing');

const { QuoteService } =require('../services');
const { mockQuoteServiceProvider } =require('../services/quote.service.mock');

const GetAllHandlerResolver = require('./get-all.handler.resolver');

describe('GetAllHandlerResolver', () => {
  let handlerResolver;

  beforeEach(async () => {
    await TestMind.configureTestingModule({
      providers: [
        GetAllHandlerResolver,
        mockQuoteServiceProvider,
      ]
    });

    handlerResolver = await TestMind.get(GetAllHandlerResolver);
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

    it('should set to ctx\'s body a json of array of quotes', async () => {
      const testQuote = { text: 'test', author: 'testAuthor' };
      const testCtx = {};

      const quoteService = await TestMind.get(QuoteService);
      const spy = spyOn(quoteService, 'getAll').and.returnValue(Promise.resolve([ testQuote ]));
      const nextFnSpy = jasmine.createSpy('nextFn');

      await handler(testCtx, nextFnSpy);
      expect(spy).toHaveBeenCalled();
      expect(testCtx.body).toEqual([ testQuote ]);
      expect(nextFnSpy).not.toHaveBeenCalled();
    });
  });

});
