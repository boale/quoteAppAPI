const { Module } = require('@mindjs/common');

const quotesy = require('quotesy');

const { QUOTESY } = require('./DI.tokens');
const { QuoteService } = require('./services');
const QuoteRoutingModule = require('./quote-routing.module');

module.exports = Module(class QuoteModule {}, {
  imports: [
    QuoteRoutingModule,
  ],
  providers: [
    {
      provide: QUOTESY,
      useValue: quotesy,
    },
    QuoteService,
  ],
});
