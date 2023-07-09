// File: ./frontend/src/App.js:
// Description: This is the main component where routing is set up and different page components & layout components are loaded based on routing.
// Classes: 
//    [+] App - The main layout of the application, including routing.
//    [+] LoginProvider - Provides the logged-in state throughout the app using Context API.
// Properties:
//    [+] isLoggedIn - stores the user's logged-in state.
//    [+] sessionId - stores the current session's id.
// Methods:
//    [+] checkSession() - Checks if the user is logged in by validating the session_id from the local storage.
//    [+] handleLogin() - Sets the isLoggedIn state to true when the user logs in.
//    [+] handleLogout() - Sets the isLoggedIn state to false when the user logs out. 

import './styles/Global.css';
import React, { createContext, useState, useEffect, useContext } from 'react';
import About from './pages/About'
import Home from './pages/Home'
import Projects from './components/Projects'
import UserProfile from './components/UserProfile'
import UserRegistration from './components/UserRegistration'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import api from './api';

// Create a context for the logged-in state
const LoginContext = createContext();

// Create a provider component for managing user's logged-in state
export const LoginProvider = ({ children }) => { //comment added
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null); 

  // This method verifies the validity of the session_id, which is stored in the local storage
  const checkSession = async () => {
    const session_id = localStorage.getItem('session_id');

    // no session_id in local storage means user is not logged in
    if (!session_id) {
      setIsLoggedIn(false);
    } else {
      const response = await api.post('/api/check_session', { session_id });

      // update the isLoggedIn and sessionId states based on the server response
      setIsLoggedIn(response.data.isLoggedIn);
      setSessionId(session_id);
    }
  };
  
  // This method manages the login mechanism
  const handleLogin = async () => {
    setIsLoggedIn(true);
    // ...other login logic can go here in the future...
  };

// This method manages the logout mechanism
const handleLogout = async () => {

  // Get session_id from local storage
  const session_id = localStorage.getItem('session_id');

  if (!session_id) {
    console.error('No session to logout');
    return;
  }

  // Make a request to the /api/logout endpoint
  const response = await api.post('/api/logout', { session_id });

  // If the response is OK, update the isLoggedIn state
  if (response.data.success) {
    setIsLoggedIn(false);
    setSessionId(null);
    localStorage.removeItem('session_id');  // remove session_id from local storage
  } else {
    console.error('Logout failed');
  }
};


  // check the session when the component mounts
  useEffect(() => {
    checkSession();
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, sessionId }}>
      {children}
    </LoginContext.Provider>
  );
};


// Hook to provide easy access to the login context
export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
}

// Main component that includes all routes and overall layout of the application
function App() {
  return (
    <LoginProvider>
      <Router>
        <div className="app-container">
          <Header className='header'/>
          <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/register" element={<UserRegistration/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    </LoginProvider>
  );
}

export default App;





// File: ./frontend/src/App.js:
// Description: This is a main component where routing is setup and different page components & layout components are loaded based on routing.
// Classes: 
//    [+] App - main layout of the application including routing.
//    [+] LoginProvider - 
// Properties:
//    [-]
// Methods:
//    [-]


/* import './styles/Global.css';
import React, { createContext, useState, useEffect, useContext } from 'react';
import About from './pages/About'
import Home from './pages/Home'
import Projects from './components/Projects'
import UserProfile from './components/UserProfile'

import UserRegistration from './components/UserRegistration'
import Header from './components/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import api from './api';

// Create a context for the logged-in state
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sessionId, setSessionId] = useState(null); 

  const checkSession = async () => {
    const session_id = localStorage.getItem('session_id');
    console.log("session_id from local storage:", session_id);  // check what is retrieved from local storage
    
    if (!session_id) {
      setIsLoggedIn(false);
    } else {
      const response = await api.post('/api/check_session', { session_id });
      console.log("response from /api/check_session:", response);  // check the response from the server
      
      setIsLoggedIn(response.data.isLoggedIn);
      setSessionId(session_id);
    }
  };
  

  const handleLogin = async () => {
    setIsLoggedIn(true);
    // ...other login logic...
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // ...other logout logic...
  };

  useEffect(() => {
    checkSession();
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, sessionId }}>
      {children}
    </LoginContext.Provider>
  );
};


export function useLogin() {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
}


function App() {
  return (
    <LoginProvider>
      <Router>
        <div className="app-container">
          <Header className='header'/>
          <Routes>
            <Route path="/about" element={<About/>}/>
            <Route path="/profile" element={<UserProfile/>}/>
            <Route path="/projects" element={<Projects/>}/>
            <Route path="/register" element={<UserRegistration/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </Router>
    </LoginProvider>
  );
}

export default App;
 */
