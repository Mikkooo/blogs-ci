import React, { useState, useEffect, useRef } from 'react';
import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import blogService from './services/blogs';
import Notification from './components/Notification';
import NewBlogForm from './components/NewBlogForm';
import Toggleable from './components/Toggleable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const createNotification = (text, colour) => {
    setNotification({ text, colour });
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  };

  const changeUser = (newUser) => {
    setUser(newUser);
    if (!newUser) {
      blogService.setAuth(null);
    } else {
      blogService.setAuth(newUser.token);
    }
  };
  useEffect(() => {
    blogService.getAll().then((bloglist) => setBlogs(bloglist));
    const storageUser = window.localStorage.getItem('loggedUser');
    if (storageUser) {
      changeUser(JSON.parse(storageUser));
    }
  }, []);

  const toggleRef = useRef();

  return (
    <div>
      <Notification notification={notification} />
      {user === null
        ? <LoginForm changeUser={changeUser} createNotification={createNotification} />
        : (
          <div>
            <Toggleable buttonLabel="create new blog" ref={toggleRef}>
              <NewBlogForm
                blogs={blogs}
                setBlogs={setBlogs}
                toggleRef={toggleRef}
                postBlog={blogService.post}
                user={user}
              />
            </Toggleable>
            <BlogList
              user={user}
              changeUser={changeUser}
              blogs={blogs}
              setBlogs={setBlogs}
              putBlog={blogService.put}
              deleteBlog={blogService.remove}
            />
          </div>
        )}
    </div>
  );
};

export default App;
