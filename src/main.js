const { mindPlatformKoa } = require('@mindjs/platform-koa');

const AppModule = require('./app/app.module');

mindPlatformKoa().bootstrapModule(AppModule);
