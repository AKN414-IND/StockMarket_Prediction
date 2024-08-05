import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Bot, X, Maximize2, Minimize2 } from 'lucide-react';
import './Chatbot.css';
import chatbotData from '../chatbotData.json';

const Chatbot = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    addMessage('bot', chatbotData.chatbotData.greeting);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (sender, text) => {
    setMessages(prevMessages => [...prevMessages, { sender, text }]);
  };

  const handleResponse = (input) => {
    const lowerInput = input.toLowerCase();
    let responseFound = false;

    // Search for keywords in the predefined keywords array
    chatbotData.keywords.forEach(keyword => {
      if (lowerInput.includes(keyword.keyword)) {
        addMessage('bot', keyword.response);
        responseFound = true;
      }
    });

    // If no keyword triggers a response, send the default error message
    if (!responseFound) {
      addMessage('bot', chatbotData.chatbotData.error.unrecognizedInput);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    addMessage('user', input);
    
    setTimeout(() => {
      handleResponse(input);
    }, 500);

    setInput('');
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div className={`chatbot ${isMinimized ? 'minimized' : ''}`}>
      <div className="chatbot-header">
        <h3>Stock Market Guide AI</h3>
        <div className="chatbot-controls">
          <button onClick={toggleMinimize} className="minimize-btn">
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button onClick={onClose} className="close-btn">
            <X size={18} />
          </button>
        </div>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
            <span>{message.text}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit"><Send size={18} /></button>
      </form>
    </div>
  );
};

export default Chatbot;
