import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [loginMessage, setLoginMessage] = useState('');
  const [blogMessage, setBlogMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );
  }, []);
  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setLoginMessage('Wrong username or password');
      setNotificationType('error');
      setTimeout(() => {
        setLoginMessage(null);
        setNotificationType('');
      }, 5000);
    };
  };
  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));

    } catch (exception) {
      setBlogMessage('create blog failed');
      setNotificationType('error');
      setTimeout(() => {
        setBlogMessage(null);
        setNotificationType('');
      }, 5000);
    }
  };
  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    setUser(null);
  };

  return (
    <div>
      {user === null
        ? <div>
          <h2>Log in to application</h2>
          <Notification message={loginMessage} type={notificationType} />
          <LoginForm username={username} password={password} handleLogin={handleLogin} handleUsernameChange={handleUsernameChange} handlePasswordChange={handlePasswordChange} />
        </div>
        : <div>
          <h2>blogs</h2>
          <Notification message={blogMessage} type={notificationType} />
          <p>{user.name} logged in <button onClick={logout}>logout</button></p>
          <h2>create new</h2>
          <Togglable buttonLabel={'new blog'}>
            <BlogForm
              createNote={addBlog}
            />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }

    </div>
  );
};
export default App;
