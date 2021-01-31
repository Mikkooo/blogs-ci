import React from 'react';
import Blog from './Blog';
import LogoutButton from './LogoutButton';

const BlogList = ({
  blogs, setBlogs, user, changeUser, putBlog, deleteBlog,
}) => {
  const deleteBlogConfirm = (blog) => {
    if (!window.confirm(`Are you sure you want to delete the blog: ${blog.title}?`)) {
      return;
    }
    deleteBlog(blog.id)
      .then(() => setBlogs(blogs.filter((b) => b.id !== blog.id)));
  };

  const addLikeToBlog = (blog) => {
    const blogWithLike = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    putBlog(blogWithLike)
      .then((response) => {
        const newBlog = response.data;
        setBlogs(blogs.map(((b) => (b.id === newBlog.id ? { ...b, likes: newBlog.likes } : b))));
      });
  };
  return (
    <div className="blogList">
      <h2>blogs</h2>
      <h3>{user.name} is logged in <LogoutButton changeUser={changeUser}/></h3>
      {blogs
        .slice()
        .sort((blog1, blog2) => blog1.likes - blog2.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLikeToBlog={addLikeToBlog}
            deleteBlog={deleteBlogConfirm}
            user={user}
          />
        ))}
    </div>
  );
};

export default BlogList;
