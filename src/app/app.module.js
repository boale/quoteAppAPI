const { Module } = require('@mindjs/common');

const { QuoteModule } = require('./quote');

module.exports = Module(class AppModule {}, {
  imports: [
    QuoteModule,
  ],
});
