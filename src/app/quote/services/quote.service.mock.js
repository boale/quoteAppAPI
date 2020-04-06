const { QUOTESY } = require('../DI.tokens');
const QuoteService = require('./quote.service');

class MockQuoteService {

  async getAll() {}

  async getRandom() { }

  async getRandomByTag() { }
}

const mockQuoteServiceProvider = {
  provide: QuoteService,
  useClass: MockQuoteService,
};

const mockQuotesyProvider = {
  provide: QUOTESY,
  useValue: {
    parse_json() {},
    random() {},
    random_by_tag() {},
  },
};

module.exports = {
  MockQuoteService,
  mockQuotesyProvider,
  mockQuoteServiceProvider,
};
