import React, { useState } from 'react';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { useAuth } from './AuthContext'; 

function App() {

  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
