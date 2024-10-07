import React, {useEffect} from 'react'

const Messages = ({messages}) => {

  return (
    <div className="messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender_id._id === JSON.parse(localStorage.getItem('loggedInUser'))._id ? 'my-message' : 'friend-message'}`}
          >
            {message.content}
          </div>
        ))}
      </div>
  )
}

export default Messages
