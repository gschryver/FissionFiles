import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../../managers/UserManager';
import { Container, Table, Button } from 'react-bootstrap';

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
    <Container className="mt-4">
      <h1>Users List</h1>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.displayName}</td>
              <td>
                <Button variant="primary" as={Link} to={`/user/${user.id}`}>
                  View Profile
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserList;
