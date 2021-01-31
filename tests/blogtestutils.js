const { hash } = require('bcrypt');
const Blog = require('../models/blog');

const normalUser = {
  _id: '5f7a12114267a001a7982da6',
  username: 'mikko',
  password: 'sala',
  name: 'Mikko',
};

const getNormalUser = async () => {
  const pwhash = await hash(normalUser.password, 0);
  return {
    ...normalUser,
    password: pwhash,
  };
};

const blogs = [
  {
    _id: '0f7a12114267a001a7982da6',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: '5f7a12114267a001a7982da6',
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: '5f7a12114267a001a7982da6',
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: '5f7a12114267a001a7982da6',
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: '5f7a12114267a001a7982da6',
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: '5f7a12114267a001a7982da6',
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: '5f7a12114267a001a7982da6',
    __v: 0,
  },
];

const normalBlog = {
  _id: '5a422bc31b54a676234d17fc',
  title: 'Mikon Blogi',
  author: 'Mikko',
  url: 'Mikonblogi.fi',
  likes: 126,
  __v: 0,
};

const blogWithoutLikes = {
  _id: '1a422bc31b54a676234d17fc',
  title: 'Blogi ilman tykkej',
  author: 'Nikko',
  url: 'ajskdfgkljadfglk.fi',
  __v: 0,
};

const blogWithoutTitle = {
  _id: '1a111bc31b54a676234d17fc',
  author: 'ilmanurlii',
  url: 'kjkjkjkjkjllll.fi',
  likes: 9,
  __v: 0,
};

const blogWithoutUrl = {
  _id: '1a111bc31b54b676234d17fc',
  title: 'Blogi ilman tittelii',
  author: 'cikko',
  likes: 1,
  __v: 0,
};

const getBlogs = async () => {
  const bloglist = await Blog.find({});
  return bloglist.map((blog) => blog.toJSON());
};

module.exports = {
  blogs,
  normalBlog,
  blogWithoutLikes,
  blogWithoutTitle,
  blogWithoutUrl,
  getBlogs,
  getNormalUser,
};
