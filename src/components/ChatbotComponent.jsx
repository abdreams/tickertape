import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../chatbot/chatbotConfig';
import MessageParser from '../chatbot/MessageParser';
import ActionProvider from '../chatbot/ActionProvider';

const ChatbotComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
      <button onClick={toggleChatbot} style={buttonStyle}>
        {isOpen ? 'Close Chatbot' : 'Open Chatbot'}
      </button>
      {isOpen && (
        <div style={chatbotContainerStyle}>
          <Chatbot config={config} messageParser={MessageParser} actionProvider={ActionProvider} />
        </div>
      )}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const chatbotContainerStyle = {
  position: 'absolute',
  bottom: '60px',
  right: '0',
  width: '300px',
  height: '400px',
  backgroundColor: 'white',
  border: '1px solid #ccc',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export default ChatbotComponent;
