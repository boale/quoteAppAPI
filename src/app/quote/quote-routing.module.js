const { RoutingModule } = require('@mindjs/routing');
const { HTTP_METHODS } = require('@mindjs/common/http');

const {
  GetAllHandlerResolver,
  GetRandomByTagHandlerResolver,
  GetRandomHandlerResolver,
} = require('./routes-handlers-resolvers');

module.exports = RoutingModule.forRoot({
  providers: [],
  routerDescriptor: {
    prefix: 'api/quotes',
    commonMiddleware: [],
    routes: [
      {
        path: '',
        method: HTTP_METHODS.GET,
        handlerResolver: GetAllHandlerResolver,
      },
      {
        path: 'random',
        method: HTTP_METHODS.GET,
        handlerResolver: GetRandomHandlerResolver,
      },
      {
        path: 'random-by-tag',
        method: HTTP_METHODS.GET,
        handlerResolver: GetRandomByTagHandlerResolver,
      },
    ],
  },
});
