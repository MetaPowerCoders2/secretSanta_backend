const request = require('supertest');
const app = require('..');
const seed = require('../db/seedFn');

describe('login endpoint', () => {
  beforeEach(async () => {
    await seed();
  });

  const user1 = {
    name: 'Lorena',
    mobile: '1234',
    email: 'lorena@test.com',
    password: 'test123',
  };

  async function register(user) {
    const registerResponse = await request(app)
      .post('/api/login/register')
      .send(user);

    return registerResponse;
  }

  async function signin(user) {
    const loginResponse = await request(app)
      .post('/api/login/signin')
      .send({ email: user.email, password: user.password });

    return loginResponse;
  }

  describe('POST /register', () => {
    test('Successfull register', async () => {
      const { statusCode, body } = await register(user1);

      expect(statusCode).toBe(200);
      expect(body).toMatchObject({
        message: 'User registered successfully! Please signin now!',
      });
    });

    test('Error when email is already registered', async () => {
      const registerResponse = await register(user1);
      expect(registerResponse.statusCode).toBe(200);

      const { statusCode, body } = await register(user1);

      expect(statusCode).toBe(400);
      expect(body).toMatchObject({
        message: 'Failed! Email is already in use!',
      });
    });
  });

  describe('POST /signin', () => {
    test('Successfull singin', async () => {
      const registerResponse = await register(user1);

      expect(registerResponse.statusCode).toBe(200);

      const { statusCode, body } = await signin({
        email: user1.email,
        password: user1.password,
      });

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('id', 'email', 'token');
    });

    test('Error when password is wrong', async () => {
      const registerResponse = await register(user1);

      expect(registerResponse.statusCode).toBe(200);

      const { statusCode, body } = await signin({
        email: user1.email,
        password: '123',
      });

      expect(statusCode).toBe(401);
      expect(body).toMatchObject({ message: 'Invalid user or password' });
    });

    test('Error when user is not registered', async () => {
      const { statusCode, body } = await signin({
        email: user1.email,
        password: user1.password,
      });

      expect(statusCode).toBe(401);
      expect(body).toMatchObject({ message: 'Invalid user or password' });
    });
  });

  describe('GET /signout', () => {
    test('Successfull signout', async () => {
      const registerResponse = await register(user1);

      expect(registerResponse.statusCode).toBe(200);

      const signinResponse = await signin({
        email: user1.email,
        password: user1.password,
      });

      expect(signinResponse.statusCode).toBe(200);

      const { statusCode, body } = await request(app)
        .get('/api/login/signout')
        .set('Cookie', signinResponse.headers['set-cookie']);

      expect(statusCode).toBe(200);
      expect(body).toMatchObject({ message: "You've been signed out!" });
    });
  });
});
