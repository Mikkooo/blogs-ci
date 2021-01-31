const dummy = (blogs) => 1; // eslint-disable-line no-unused-vars

const totalLikes = (blogs) => blogs.reduce((likes, blog) => likes + blog.likes, 0);

const favouriteBlog = (blogs) => blogs.reduce((favourite, blog) => {
  if (!favourite || blog.likes > favourite.likes) {
    return blog;
  }
  return favourite;
}, null);

const mostBlogs = (blogs) => {
  const authors = blogs.reduce((result, blog) => {
    const found = result.find(((r) => r.author === blog.author));
    if (!found) {
      result.push({
        author: blog.author,
        blogs: 1,
      });
    } else {
      found.blogs += 1;
    }
    return result;
  }, []);
  return authors.reduce((most, author) => {
    if (!most || author.blogs > most.blogs) {
      return author;
    }
    return most;
  }, null);
};

const mostLikes = (blogs) => {
  const authors = blogs.reduce((result, blog) => {
    const found = result.find(((r) => r.author === blog.author));
    if (!found) {
      result.push({
        author: blog.author,
        likes: blog.likes,
      });
    } else {
      found.likes += blog.likes;
    }
    return result;
  }, []);
  return authors.reduce((most, author) => {
    if (!most || author.likes > most.likes) {
      return author;
    }
    return most;
  }, null);
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
