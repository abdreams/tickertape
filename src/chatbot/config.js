// src/chatbot/config.js
import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "PortfolioBot",
  initialMessages: [createChatBotMessage(`Hi! I'm PortfolioBot. Ask me about portfolio optimization.`)],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#FF0000", // Red for bot messages
    },
    chatButton: {
      backgroundColor: "#FF0000", // Red for the chat button
    },
    userMessageBox: {
      display: 'none' // Hide user input box
    }
  },
  widgets: [],
};

export default config;
