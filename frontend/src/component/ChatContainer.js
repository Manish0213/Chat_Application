import React, { useEffect } from 'react';
import ChatList from './ChatList';

const ChatContainer = ({ chat, socket, fetchChatList }) => {

  return (
    <div className='chat-container'>
      <ChatList chat={chat} socket={socket} fetchChatList={fetchChatList} />
    </div>
  );
};

export default ChatContainer;
