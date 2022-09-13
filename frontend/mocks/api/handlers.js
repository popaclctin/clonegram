import { rest } from 'msw';
import { API_URL } from '../../src/config/config';

export const handlers = [
  rest.post(`${API_URL}auth/login`, (req, res, ctx) => {
    console.log('_______________________------------------------');
    return res(
      ctx.json({
        token: 'token',
        user: {
          id: '123',
          email: 'bula@gmail.com',
          username: 'bula',
          fullName: 'Bula Petrescu',
        },
      }),
      ctx.delay(150)
    );
  }),
];
