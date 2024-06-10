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



import './styles/App.css';
import React, { createContext, useState, useEffect, useContext } from 'react';
import About from './pages/About';
import Home from './pages/Home';
import Projects from './components/Projects';
import UserRegistration from './components/UserRegistration';
import Header from './components/Header';
import Footer from './components/Footer';
import MarketplacePage from './components/MarketplacePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import api from './api';
import ErrorBoundary from './components/ErrorBoundary';
import UserLogin from './components/UserLogin';
import NotFound from './components/NotFound';
import AdminPage from './components/AdminPage';
import User from './components/User';
import Contribute from './pages/Contribute';
import Donate from './pages/Donate';
import Privacy from './pages/Privacy';
import TOS from './pages/TOS';
import Spheres from './pages/Spheres';
import Unions from './pages/Unions';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/Settings';
//import UserProfile from './pages/UserProfile';



// Create a context for the logged-in state
const LoginContext = createContext();

// Create a provider component for managing user's logged-in state
export const LoginProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sessionId, setSessionId] = useState(localStorage.getItem('session_id'));
    const [userId, setUserId] = useState(localStorage.getItem('user_id'));

    // This method verifies the validity of the session_id, which is stored in the local storage
    const checkSession = async () => {
        const session_id = localStorage.getItem('session_id');
        // no session_id in local storage means user is not logged in
        if (!session_id) {
            setIsLoggedIn(false);
        } else {
            try {
                const response = await api.get('/api/check_session', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (response.data.status === 'active') {
                    setIsLoggedIn(true);
                    setSessionId(session_id);
                    setUserId(response.data.user_id);
                    localStorage.setItem('user_id', response.data.user_id);
                } else {
                    setIsLoggedIn(false);
                    localStorage.removeItem('session_id');
                    localStorage.removeItem('user_id');
                }
            } catch (error) {
                console.error('Error checking session:', error);
                setIsLoggedIn(false);
                localStorage.removeItem('session_id');
                localStorage.removeItem('user_id');
            }
        }
    };


    
    // This method manages the login mechanism
    const handleLogin = async () => {
        setIsLoggedIn(true);
        const user_id = localStorage.getItem('user_id');
        localStorage.setItem('user_id', user_id);
        setUserId(user_id); // Set the userId state
        // ...other login logic can go here in the future...
    };

    // This method manages the logout mechanism
    const handleLogout = async () => {
        // Get session_id from local storage
        const session_id = localStorage.getItem('session_id');
        const user_id = localStorage.getItem('user_id');
        if (!session_id || !user_id) {
            console.error('No session to logout');
            return;
        }
        try {
            // Make a request to the /api/logout endpoint
            const response = await api.post('/api/logout', { session_id, user_id }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // If the response is OK, update the isLoggedIn state
            if (response.data.success) {
                setIsLoggedIn(false);
                setSessionId(null);
                localStorage.removeItem('session_id');
                localStorage.removeItem('user_id'); // Remove the userId from sessionStorage
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    // check the session when the component mounts
    useEffect(() => {
        checkSession();
    }, []);

    return (
        <LoginContext.Provider value={{ isLoggedIn, handleLogin, handleLogout, sessionId, userId }}>
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
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/spheres" element={<Spheres/>}/>
                        <Route path="/unions" element={<Unions/>}/>
                        <Route path="/marketplace" element={
                                          <ErrorBoundary>
                                          <MarketplacePage />
                                          </ErrorBoundary>
                        }/>
                        <Route path="/contribute" element={<div className='container'><Contribute/></div>}/>
                        <Route path="/donate" element={<div className='container'><Donate/></div>}/>
                        <Route path="/privacy" element={<div className='container'><Privacy/></div>}/>
                        <Route path="/tos" element={<div className='container'><TOS/></div>}/>
                        <Route path="/admin" element={<div className='container'><AdminPage/></div>}/>
                        <Route path="/settings" element={<SettingsPage/>}/>
                        <Route path="/user" element={<User/>}/>
                        <Route path="/register" element={<div className='container'><UserRegistration/></div>}/>
                        <Route path="/login" element={<div className='container'><UserLogin/></div>}/>
                        <Route path="*" element={<div className='container'><NotFound/></div>} />
                    </Routes>
                    <Footer className='footer'/>
                </div>
            </Router>
        </LoginProvider>
    );
}

export default App;