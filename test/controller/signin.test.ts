

const request = require('supertest')
const signinController = require('../controllers/signinController');
describe('Post Endpoints', () => {
  it('should create a new post', async () => {
    const res = await request(signinController)
      .post('/api/v1/signin')
      .send({
        email: "shamseer@gmail.com",
        password: '12345',
      })
     expect(res.statusCode).toEqual(201)
     expect(res.body).toHaveProperty('post')
  })
})