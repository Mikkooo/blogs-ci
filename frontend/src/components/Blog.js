import React, { useState } from 'react';

const buttonStyle = {
  marginLeft: '10px',
};

const removeButtonStyle = {
  backgroundColor: 'red',
};

const blogStyle = {
  border: '1px solid black',
  margin: '5px',
  padding: '5px',
};

const Blog = ({
  blog, addLikeToBlog, deleteBlog, user,
}) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div style={blogStyle} className="blog" >
      {`${blog.title} | ${blog.author}`}
      <button style={buttonStyle} onClick={toggleExpanded} className="expandButton" >
        {expanded ? 'hide' : 'show'}
      </button>

      {expanded
        && <div style={{ margin: '3px' }}>
          {blog.url} <br/>
          likes: <span className="likeCount">{blog.likes}</span>
          <button onClick={() => addLikeToBlog(blog)} className='likeButton'>
            like
          </button> <br/>
          {blog.user.name} <br/>

          {user.username === blog.user.username ? (
            <button onClick={() => deleteBlog(blog)} style={removeButtonStyle} className="deleteButton">
              remove
            </button>
          ) : null}
        </div>
      }
    </div>
  );
};

export default Blog;
