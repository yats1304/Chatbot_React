import { useRef } from "react";

const Chatform = ({ chatHistory, setChatHistory, generateBotResposnse }) => {
  const inputRef = useRef();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    // Add user's message to chat history
    setChatHistory((history) => [
      ...history,
      { role: "user", text: userMessage },
    ]);

    // Delay and then add "Thinking..." and call bot
    setTimeout(() => {
      setChatHistory((history) => [
        ...history,
        { role: "model", text: "Thinking..." },
      ]);

      // Now call the bot response generation AFTER Thinking... is added
      generateBotResposnse([
        ...chatHistory,
        { role: "user", text: userMessage },
      ]);
    }, 600);
  };
 
  return (
    <form className="chat-form" onSubmit={handleFormSubmit}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Message..."
        className="message-input"
        required
      />
      <button type="submit" className="material-symbols-rounded">
        arrow_upward
      </button>
    </form>
  );
};

export default Chatform;
