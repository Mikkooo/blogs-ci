const {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes,
} = require('../utils/list_helper');

const { blogs } = require('./blogtestutils');

const singleBlog = [blogs[0]];

test('dummy returns one', () => {
  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('With an empty list should be zero', () => {
    const result = totalLikes([]);
    expect(result).toBe(0);
  });

  test('With one blog should be likes of that blog', () => {
    const result = totalLikes(singleBlog);
    expect(result).toBe(7);
  });

  test('Of a list of blogs should be calculated right', () => {
    const result = totalLikes(blogs);
    expect(result).toBe(36);
  });
});

describe('favourite blog', () => {
  test('of 1 blog should be te blog itself', () => {
    const result = favouriteBlog(singleBlog);
    expect(result).toEqual(singleBlog[0]);
  });

  test('of multiple blogs should be the one with the most likes', () => {
    const result = favouriteBlog(blogs);
    expect(result).toEqual(blogs[2]);
  });

  test('of empty list should be null', () => {
    const result = favouriteBlog([]);
    expect(result).toBe(null);
  });
});

describe('most blogs', () => {
  test('of zero blogs should be null', () => {
    const result = mostBlogs([]);
    expect(result).toBe(null);
  });

  test('of one blog should be its author with one blog', () => {
    const result = mostBlogs(singleBlog);
    expect(result).toEqual({
      author: 'Michael Chan',
      blogs: 1,
    });
  });

  test('of multiple blogs should return the correct result', () => {
    const result = mostBlogs(blogs);
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });
});

describe('most likes', () => {
  test('of zero blogs should be null', () => {
    const result = mostLikes([]);
    expect(result).toBe(null);
  });

  test('of one blog should be its author with its likes', () => {
    const result = mostLikes(singleBlog);
    expect(result).toEqual({
      author: 'Michael Chan',
      likes: 7,
    });
  });

  test('of multiple blogs should return the correct result', () => {
    const result = mostLikes(blogs);
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
