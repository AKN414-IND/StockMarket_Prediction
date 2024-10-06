import React, { useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Chatbot from './Components/Chatbot';
import { MessageCircle, X } from 'lucide-react';
import { useAuth } from './AuthContext'; 

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const { logout } = useAuth(); 
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div className="App">
      <Header />
      <Footer />
      <div className={`chatbot-container ${isChatbotOpen ? 'open' : ''}`}>
        {isChatbotOpen && <Chatbot />}
        <button
          className="chatbot-toggle"
          onClick={toggleChatbot}
          aria-label={isChatbotOpen ? 'Close chat' : 'Open chat'}
        >
          {isChatbotOpen ? <X size={24} /> : <MessageCircle size={24} />}
        </button>
      </div>
    </div>
  );
}

export default App;
