// UserList.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  // Hardcoded user data

  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersList();
  }, []);

  const fetchUsersList = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/userlist`);
    const data = await response.json();
    setUsers(data);
  };

  const handleUserClick = async (user) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/chat/createChat`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender_id: user._id,
        receiver_id: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      }),
    });
    const data = await response.json();
    navigate(`/chat/${data._id}`);
  };

  return (
    <div className="userlist-container">
      <h2>Select a User</h2>
      <ul>
        {users.map((user) => {
          if (JSON.parse(localStorage.getItem('loggedInUser'))._id !== user._id) {
            return <li key={user._id} onClick={() => handleUserClick(user)}>
              {user.name}
            </li>
          }
        })}
      </ul>
    </div>
  );
};

export default UserList;
