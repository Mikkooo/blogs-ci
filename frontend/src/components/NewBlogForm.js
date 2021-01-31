import React, { useState } from 'react';

const NewBlogForm = ({
  blogs, setBlogs, toggleRef, postBlog, user,
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    postBlog({ title, author, url })
      .then(({ data }) => {
        setBlogs(blogs.concat({ ...data, user }));
        setTitle('');
        setAuthor('');
        setUrl('');
        toggleRef.current.toggle();
      })
      .catch(() => {});
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label> title:
          <input type='text' onChange={({ target }) => setTitle(target.value)} value={title} className="titleInput" />
        </label>
      </div>
      <div>
        <label> author:
          <input type='text' onChange={({ target }) => setAuthor(target.value)} value={author} className="authorInput" />
        </label>
      </div>
      <div>
        <label> url:
          <input type='text' onChange={({ target }) => setUrl(target.value)} value={url} className="urlInput" />
        </label>
      </div>
      <button type='submit' className="submitBlogButton"> Create </button>
    </form>
  );
};

export default NewBlogForm;
