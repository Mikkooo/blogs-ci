const mongoose = require('mongoose');
const supertest = require('supertest');

const app = require('../app');
const User = require('../models/user');
const {
  getHashedUsers, getUsersInDb, notHashedUsers,
} = require('./usertestutils');

const api = supertest(app);

describe('The user api', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const hashedUsers = await getHashedUsers();
    const userObjs = hashedUsers.map((user) => new User(user));
    const promises = userObjs.map((u) => u.save());

    await Promise.all(promises);
  });

  test('Should correctly return the users', async () => {
    const expected = {
      id: notHashedUsers[0]._id,
      username: 'eka',
      name: 'Eka',
      blogs: [],
    };
    const { body } = await api
      .get('/api/users')
      .expect(200);
    expect(body).toHaveLength(4);
    expect(body).toContainEqual(expected);
  });

  test('Should allow posting of users', async () => {
    const user = { username: 'mikko', password: 'asd', name: 'mikkoboi' };
    await api
      .post('/api/users')
      .send(user)
      .expect(200);
    const users = await getUsersInDb();
    expect(users.find((u) => u.username === 'mikko')).toBeDefined();
  });
  test('Should reject too short usernames and passwords', async () => {
    const response1 = await api
      .post('/api/users')
      .send({
        username: 'mi',
        password: 'asd',
        name: 'shortusername',
      })
      .expect(500);

    expect(response1.text).toContain('ValidationError');

    const response2 = await api
      .post('/api/users')
      .send({
        username: 'mik',
        password: 'as',
        name: 'shotpassword',
      })
      .expect(400);

    expect(response2.body).toEqual('Password should be atleast 3 characters');

    const users = await getUsersInDb();
    expect(users.find((u) => u.username === 'mi')).toBeUndefined();
    expect(users.find((u) => u.username === 'mik')).toBeUndefined();
  });

  test('Should reject non-unique usernames', async () => {
    const { username } = notHashedUsers[0];
    const response = await api
      .post('/api/users')
      .send({
        username,
        password: 'abc',
      })
      .expect(500);
    expect(response.text).toContain('ValidationError');
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
