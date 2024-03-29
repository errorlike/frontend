import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
  const id = useParams().id;
  const user = useSelector(state => {
    return state.users.find(user => user.id === id);
  });
  if (!user) {
    return null;
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>{user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
    </div>
  );
};

export default UserDetails;