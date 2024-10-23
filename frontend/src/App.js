import React, { useEffect, useState } from "react";
import "./App.css";
import ChatContainer from "./component/ChatContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import UserList from "./component/UserList";
import Navbar from "./component/Navbar";
import ChatBoard from "./component/ChatBoard";
import { io } from "socket.io-client";

function App() {
  const [chat, setChat] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (token) {
      fetchChatList();
    }
  }, [token]);
  
  // Setup Socket.IO connection
  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
  
      const newSocket = io(process.env.REACT_APP_API_URL, {
        transports: ['websocket', 'polling']
      }); // Backend URL
      setSocket(newSocket);
  
      newSocket.on("connect", () => {
        console.log("Connected to socket server:", newSocket.id);
      });
  
      return () => {
        newSocket.disconnect();
      };
    } else {
      console.log('No logged in user found in localStorage');
    }
  }, [token]);
  

  const fetchChatList = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/chat/getChatList`,
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setChat(data);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ChatContainer chat={chat} socket={socket} fetchChatList={fetchChatList} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/userlist" element={<UserList />} />
        <Route path="/chat/:chatId" element={<ChatBoard socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
