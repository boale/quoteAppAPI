const { APP_SERVER } = require('@mindjs/core');
const { mindPlatformKoa } = require('@mindjs/platform-koa');
const { TestMind } = require('@mindjs/testing');

const request = require('supertest');

const QuoteModule = require('./quote.module');
const { QuoteService } = require('./services');

describe('QuoteModule', () => {
  const mockQuote = { text: '1', author: 'author1' };
  const mockQuote1 = { text: '2', author: 'author2' };
  const mockAllData = [
    mockQuote,
    mockQuote1,
    { text: '3', author: 'author' },
  ];

  beforeEach(async () => {
    await TestMind.configureTestingModule({
      module: QuoteModule,
      providers: [
        {
          provide: QuoteService,
          useValue: {
            async getAll() {
              return mockAllData
            },
            async getRandom() {
              return mockQuote;
            },
            async getRandomByTag () {
              return mockQuote1;
            }
          }
        }
      ],
      platform: mindPlatformKoa(),
    }, {
      envVariables: {
        NODE_ENV: 'production',
        ENV_CONFIGURATION: 'test',
        PORT: 4444,
      }
    });
  });

  describe('Quote API', () => {
    let server;

    beforeEach(async () => {
      await TestMind.bootstrap();
      server = await TestMind.get(APP_SERVER);
    });

    afterAll(async () => {
      await TestMind.terminate();
    });

    it('should expose GET /quotes API endpoint', async done => {
      expect(server).toBeDefined();

      request(server.callback())
        .get('/api/quotes')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          expect(res.body).toBeInstanceOf(Array);
          expect(res.body).toEqual(mockAllData);

          done();
        });
    });

    it('should expose GET /quotes/random API endpoint', async done => {
      expect(server).toBeDefined();

      request(server.callback())
        .get('/api/quotes/random')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          const { text, author } = res.body;

          expect(res.body).toEqual(mockQuote);

          done();
        });
    });

    it('should expose GET /quotes/random-by-tag API endpoint', async done => {
      expect(server).toBeDefined();

      request(server.callback())
        .get('/api/quotes/random-by-tag?tag=education')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          expect(res.body).toEqual(mockQuote1);

          done();
        });
    });

  });

});
