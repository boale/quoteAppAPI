const { APP_SERVER } = require('@mindjs/core');
const { mindPlatformKoa } = require('@mindjs/platform-koa');
const { TestMind } = require('@mindjs/testing');

const request = require('supertest');

const AppModule = require('./app.module');

describe('AppModule', () => {

  beforeEach(async () => {
    await TestMind.configureTestingModule({
      module: AppModule,
      platform: mindPlatformKoa(),
    }, {
      envVariables: {
        NODE_ENV: 'production',
        ENV_CONFIGUTATION: 'test',
        PORT: 5555,
      },
    });
  });

  describe('App base API', () => {
    let server;

    beforeEach(async () => {
      await TestMind.bootstrap();
      server = await TestMind.get(APP_SERVER);
    });

    afterAll(async () => {
      await TestMind.terminate();
    });

    it('should expose GET /ping API endpoint', async done => {
      expect(server).toBeDefined();

      request(server.callback())
        .get('/ping')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          done();
        });
    });

  });

});
