const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const Blog = require('../models/blog');
const User = require('../models/user');
const {
  blogs,
  normalBlog,
  blogWithoutLikes,
  blogWithoutTitle,
  blogWithoutUrl,
  getBlogs,
  getNormalUser,
} = require('./blogtestutils');

const api = supertest(app);

describe('The backend', () => {
  let token;
  beforeAll(async () => {
    await User.deleteMany({});
    const user = await getNormalUser();
    const userObj = new User(user);
    await userObj.save();
    const { body } = await api
      .post('/api/login')
      .send({ username: 'mikko', password: 'sala' });
    token = body.token;
  });

  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogObjs = blogs.map((blog) => new Blog(blog));
    const promises = blogObjs.map((b) => b.save());
    await Promise.all(promises);
  });

  test('should return correct amount of blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(response.body).toHaveLength(6);
  });

  test('should transform id field to correct name', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].id).toBeDefined();
  });

  test('should add blogs on post', async () => {
    await api
      .post('/api/blogs')
      .send(normalBlog)
      .set({ Authorization: `bearer ${token}` })
      .expect(201);
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(7);
  });

  test('should give 0 likes to blog without likes', async () => {
    const response = await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .set({ Authorization: `bearer ${token}` })
      .expect(201);
    expect(response.body.likes).toBe(0);
  });

  test('should return 400 when url or title absent', async () => {
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .set({ Authorization: `bearer ${token}` })
      .expect(400);
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .set({ Authorization: `bearer ${token}` })
      .expect(400);
  });

  test('should delete blog successfully', async () => {
    const id = blogs[0]._id;
    const { title } = blogs[0];
    await api
      .delete(`/api/blogs/${id}`)
      .set({ Authorization: `bearer ${token}` })
      .expect(204);

    const afterDelete = await getBlogs();
    const titlesAfterDelete = afterDelete.map((b) => b.title);

    expect(titlesAfterDelete).not.toContain(title);
  });

  test('Should not delete without token', async () => {
    const id = blogs[0]._id;
    const { title } = blogs[0];
    await api
      .delete(`/api/blogs/${id}`)
      .expect(401);
    const afterDelete = await getBlogs();
    const titlesAfterDelete = afterDelete.map((b) => b.title);

    expect(titlesAfterDelete).toContain(title);
  });

  test('Should modify blog likes correctly', async () => {
    const target = blogs[0];
    await api
      .put(`/api/blogs/${target._id}`)
      .send({ ...target, likes: target.likes + 1 })
      .expect(200);
    const afterUpdate = await getBlogs();
    const targetAfterUpdate = afterUpdate.find((b) => b.id === target._id);

    expect(targetAfterUpdate.likes).toBe(8);
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
