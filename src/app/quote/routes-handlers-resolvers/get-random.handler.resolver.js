const { Injectable } = require('@mindjs/common');

const { QuoteService } =require('../services');

class GetRandomHandlerResolver {

  static get parameters() {
    return [QuoteService];
  }

  constructor(quoteService) {
    this.quoteService = quoteService;
  }

  async resolve() {
    return async ctx => ctx.body = await this.quoteService.getRandom();
  }
}

module.exports = Injectable(GetRandomHandlerResolver);
