import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';

const UserList = () => {
  const { getUsers, user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user && user.userTypeId !== 1) { 
    } else {
      getUsers().then(setUsers);
    }
  }, [getUsers, user]);

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
