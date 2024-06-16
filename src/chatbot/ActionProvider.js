// src/chatbot/ActionProvider.js
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleDiversification = () => {
    const message = this.createChatBotMessage(
      "Diversification is the process of allocating investments among various financial instruments, industries, and other categories to reduce risk."
    );
    this.updateChatbotState(message);
  };

  handleRiskManagement = () => {
    const message = this.createChatBotMessage(
      "Risk management involves identifying, assessing, and prioritizing risks followed by coordinated efforts to minimize, monitor, and control the impact of risk events."
    );
    this.updateChatbotState(message);
  };

  handleExpectedReturns = () => {
    const message = this.createChatBotMessage(
      "Expected returns are the profits or losses that an investor anticipates on an investment that has known or expected rates of return."
    );
    this.updateChatbotState(message);
  };

  handleDefault = () => {
    const message = this.createChatBotMessage(
      "I'm not sure how to help with that. Can you please ask something related to portfolio optimization?"
    );
    this.updateChatbotState(message);
  };

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider;
