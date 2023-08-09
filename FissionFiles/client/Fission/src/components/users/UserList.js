import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../../managers/UserManager";
import { Container, Table, Button } from "react-bootstrap";

const UserList = () => {
  const { getUsers, user, banUser, unbanUser } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [bannedUsers, setBannedUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.userTypeId !== 1) {
      navigate("/not-authorized");
    } else {
      getUsers().then((users) => {
        setUsers(users.filter((u) => u.isActive));
        setBannedUsers(users.filter((u) => !u.isActive));
      });
    }
  }, [getUsers, user, navigate]);

  const handleBan = (userId) => {
    if (window.confirm("Are you sure you want to ban this user?")) {
      banUser(userId).then(() => {
        getUsers().then((allUsers) => {
          setUsers(allUsers.filter((u) => u.isActive));
          setBannedUsers(allUsers.filter((u) => !u.isActive));
        });
      });
    }
  };

  const handleUnban = (userId) => {
    if (window.confirm("Are you sure you want to unban this user?")) {
      unbanUser(userId).then(() => {
        getUsers().then((allUsers) => {
          setUsers(allUsers.filter((u) => u.isActive));
          setBannedUsers(allUsers.filter((u) => !u.isActive));
        });
      });
    }
  };

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
                <Button variant="danger" onClick={() => handleBan(user.id)}>
                  Ban User
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <h1 className="mt-5">Banned Users List</h1>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bannedUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.displayName}</td>
              <td>
                <Button variant="success" onClick={() => handleUnban(user.id)}>
                  Unban User
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
