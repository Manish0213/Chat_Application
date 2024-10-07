import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Messages from "./Messages";

const ChatBoard = ({socket}) => {
  const { chatId } = useParams();

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [otherParticipant, setOtherParticipant] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    if (socket && chatId) {

      // If there's already a room, leave it before joining the new one
      if (currentRoom) {
        socket.emit('leaveRoom', currentRoom);
      }

      // Join the room
      socket.emit('joinRoom', chatId);

      // Fetch previous messages
      socket.on('previousMessages', (msgs) => {
        setMessages(msgs);
      });

      // Request chat user details when joining the room
      socket.emit('fetchChatUser', chatId);

      // Listen for the chat user response
      socket.on('chatUserResponse', (data) => {
        setSelectedUser(data);
      });

      // Listen for new messages
      socket.on('receiveMessage', (msg) => {
        setMessages((prev) => [...prev, msg]);
      });
    }

    return () => {
      if (socket) {
        socket.emit('leaveRoom', chatId);
        socket.off('previousMessages');
        socket.off('chatUserResponse');
        socket.off('receiveMessage');
      }
    };
  }, [socket, chatId]);

  useEffect(() => {
    if (selectedUser) {
      const userId = JSON.parse(localStorage.getItem('loggedInUser'))._id;

      const selectedParticipant = selectedUser.participants.find(
        (participant) => participant._id !== userId
      );
      setOtherParticipant(selectedParticipant);
    }
  }, [selectedUser]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;
    const loggedInUserId = JSON.parse(localStorage.getItem("loggedInUser"))._id;
    if (socket && newMessage) {
      socket.emit('sendMessage', { chatId, newMessage, loggedInUserId });
      setNewMessage("");
    }
  };

  return (
    <div className="chatboard-container">
      <h2>
        Chat with{" "}
        {otherParticipant !== null ? otherParticipant.name : "Loading..."}
      </h2>
      <Messages messages={messages} />
      <div className="message-input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBoard;
