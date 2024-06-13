class ActionProvider {
    constructor(createChatBotMessage, setStateFunc, createClientMessage) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
      this.createClientMessage = createClientMessage;
    }
  
    handlePortfolio = () => {
      const message = this.createChatBotMessage("Sure, I can help you with your portfolio. What do you need assistance with?");
      this.setState(prev => ({ ...prev, messages: [...prev.messages, message] }));
    };
  
    handleOptimization = () => {
      const message = this.createChatBotMessage("To optimize your portfolio, please provide the list of stocks and their respective weights.");
      this.setState(prev => ({ ...prev, messages: [...prev.messages, message] }));
    };
  
    handleDefault = (message) => {
      const defaultMessage = this.createChatBotMessage(`I'm not sure how to respond to "${message}". Can you please clarify?`);
      this.setState(prev => ({ ...prev, messages: [...prev.messages, defaultMessage] }));
    };
  }
  
  export default ActionProvider;
  