import { createChatBotMessage } from 'react-chatbot-kit';
// import QuickReply from './QuickReply'; // Adjust the path if needed

const botName = "PortfolioBot";

const config = {
  botName: botName,
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}. How can I assist you with your portfolio today?`)],
//   widgets: [
//     {
//       widgetName: "QuickReply",
//       widgetFunc: (props) => <QuickReply {...props} />,
//     },
//   ],
};

export default config;
