const request = require('supertest');
const app = require('../app');
const supertest = request(app);
const mockDb = require('../utils/mockDb');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

// jest.mock('multer', () => {
//   const multer = () => ({
//     single: () => {
//       return (req, res, next) => {
//         req.files = [
//           {
//             originalname: 'sample.name',
//             mimetype: 'sample.type',
//             path: 'sample.url',
//             buffer: Buffer.from('whatever'),
//           },
//         ];
//         next();
//       };
//     },
//   });
//   multer.diskStorage = () => jest.fn();
//   return multer;
// });

const userId = '6303689411cdee29266d8ce1';
const postId = '6309b07d04328343d274b097';

describe('posts', () => {
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

  describe('GET /post/?userId route', () => {
    describe('given the userId does not exist', () => {
      it('should return a 400 status', async () => {
        await supertest.get('/post').expect(400);
      });
    });

    describe('given the userId exists', () => {
      it('should return a list of posts', async () => {
        const { body } = await supertest
          .get(`/post/?userId=${userId}`)
          .expect(200);
        expect(body).toEqual({
          posts: expect.any(Array),
          totalPages: expect.any(Number),
          currentPage: expect.any(Number),
        });
      });
    });
  });

  describe('GET /post/postId route', () => {
    describe('given the postId is valid', () => {
      it('should return a post', async () => {
        const response = await supertest.get(`/post/${postId}`).expect(200);
        expect(response.body.user).toEqual('6309ade702c38e10ef6d4cee');
        expect(response.body.caption).toEqual('A fost o data...');
        expect(response.body.image_path).toEqual(
          'D:\\Coding\\instagram-clone\\backend\\public\\uploads\\1661579324289-20161221_111600.jpg'
        );
        expect(response.body.caption).toEqual('A fost o data...');
      });
    });
  });

  //FIXME: try to mock multer so it doesn't upload the image
  describe('POST /post route', () => {
    describe('given the fields are valid', () => {
      it('should return 201 status', async () => {
        const response = await supertest
          .post(`/post`)
          .attach('image', 'tests/cute-dog.jpg')
          .field('userId', userId)
          .field('caption', 'The cutest dog ever')
          .expect(201);
        expect(response.body.message).toEqual('Post created');
      });
    });
  });
});
