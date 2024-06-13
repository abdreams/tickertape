import React from 'react';

const QuickReply = ({ setState, createChatBotMessage }) => {
  const handleClick = (reply) => {
    const message = createChatBotMessage(reply);
    setState((prev) => ({ ...prev, messages: [...prev.messages, message] }));
  };

  return (
    <div>
      <button onClick={() => handleClick("Tell me about portfolios")}>Portfolios</button>
      <button onClick={() => handleClick("Help me optimize my portfolio")}>Optimize Portfolio</button>
    </div>
  );
};

export default QuickReply;
