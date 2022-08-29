const request = require('supertest');
const app = require('../app');
const mockDb = require('../utils/mockDb');

const user = { email: 'lica@gmail.com', password: 'parola' };

describe('authentication', () => {
  beforeAll(() => {
    return mockDb.connect();
  });
  afterAll(() => {
    return mockDb.disconnect();
  });
  beforeEach(() => {
    return mockDb.initializeCollections();
  });
  afterEach(() => {
    return mockDb.dropCollections();
  });

  describe('get auth/login route', () => {
    describe('given the email does not exist', () => {
      it('should return a 404 status', async () => {
        await request(app)
          .post('/auth/login')
          .send({ password: user.password })
          .expect(400);
      });
    });

    describe('given the email or password are invalid', () => {
      it('should return a 400 status', async () => {
        await request(app)
          .post('/auth/login')
          .send({ ...user, password: 'parolaGresita' })
          .expect(400);
      });
    });

    describe('given the email or password are valid', () => {
      it('should return the user payload', async () => {
        const { statusCode, body } = await request(app)
          .post('/auth/login')
          .send(user);
        expect(statusCode).toBe(200);
        expect(body).toEqual({
          token: expect.any(String),
          id: expect.any(String),
          email: user.email,
          username: expect.any(String),
          fullName: expect.any(String),
        });
      });
    });
  });
});
