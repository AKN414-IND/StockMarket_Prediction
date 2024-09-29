// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider, useAuth } from './AuthContext'; // Import Auth context
import Login from './Components/Login';

const RootComponent = () => {
  const { isLoggedIn } = useAuth(); // Get the authentication state

  return isLoggedIn ? <App /> : <Login />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RootComponent />
    </AuthProvider>
  </React.StrictMode>
);
