// src/chatbot/MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("diversification")) {
      this.actionProvider.handleDiversification();
    } else if (lowerCaseMessage.includes("risk")) {
      this.actionProvider.handleRiskManagement();
    } else if (lowerCaseMessage.includes("returns")) {
      this.actionProvider.handleExpectedReturns();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser;
