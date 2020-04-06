const { Injectable } = require('@mindjs/common');

const { QuoteService } =require('../services');

class GetRandomByTagHandlerResolver {

  static get parameters() {
    return [QuoteService];
  }

  constructor(quoteService) {
    this.quoteService = quoteService;
  }

  async resolve() {
    return async ctx => {
      const { query: { tag = '' } } = ctx.request;
      ctx.body = await this.quoteService.getRandomByTag(tag);
    };
  }
}

module.exports = Injectable(GetRandomByTagHandlerResolver);
