import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';

const UserList = () => {
  const { getUsers, user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (user && user.userTypeId !== 1) { 
      navigate('/not-authorized'); 
    } else {
      getUsers().then(setUsers);
    }
  }, [getUsers, user, navigate]);

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.displayName}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
