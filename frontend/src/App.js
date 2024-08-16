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
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Projects from './components/Projects';
import UserRegistration from './components/UserRegistration';
import Header from './components/Header';
import Footer from './components/Footer';
import MarketplacePage from './pages/MarketplacePage';
import api from './api';
import ErrorBoundary from './components/ErrorBoundary';
import UserLogin from './components/UserLogin';
import NotFound from './components/NotFound';
import AdminPage from './components/AdminPage';
import UserPage from './pages/UserPage';
import Contribute from './pages/Contribute';
import Donate from './pages/Donate';
import Privacy from './pages/Privacy';
import TOS from './pages/TOS';
import Spheres from './pages/Spheres';
import SpherePage from './pages/SpherePage';
import Unions from './pages/Unions';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/Settings';
import SphereManagement from './pages/SphereManagement';
import UnionPage from './pages/UnionPage';
import ProjectPage from './pages/ProjectPage';
import UnionManagement from './pages/UnionManagement';
import ProjectManagement from './pages/ProjectManagement';

const LoginContext = createContext();

function LoginProvider({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const getSessionIdFromCookie = () => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; session_id=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const handleLogout = useCallback(async () => {
        const session_id = getSessionIdFromCookie();
        console.log('Logging out with session_id:', session_id);
        if (!session_id) {
            console.error('No session to logout');
            return;
        }
        try {
            const response = await api.post('/api/logout', { session_id }, {
                headers: {
                    'Content-Type': 'application/json',
                    'session_id': session_id
                }
            });
            console.log('Logout response:', response.data);
            if (response.data.success) {
                setIsLoggedIn(false);
                setSessionId(null);
                setUserId(null);
                document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                navigate('/login');
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }, [navigate]);

    const checkSession = useCallback(async () => {
        const session_id = getSessionIdFromCookie();
        console.log('Checking session with session_id:', session_id);
        if (!session_id) {
            console.log('No session_id found in cookies');
            setIsLoggedIn(false);
            return;
        }
        try {
            const response = await api.get('/api/check_session', {
                headers: {
                    'Content-Type': 'application/json',
                    'session_id': session_id
                },
                withCredentials: true
            });
            console.log('Check session response:', response.data);
            if (response.data.status === 'active') {
                setIsLoggedIn(true);
                setSessionId(session_id);
                setUserId(response.data.user_id);
            } else {
                handleLogout();
            }
        } catch (error) {
            console.error('Error checking session:', error);
            handleLogout();
        }
    }, [handleLogout]);

    useEffect(() => {
        checkSession();
        const intervalId = setInterval(checkSession, 5 * 60 * 1000); // Check every 5 minutes
        return () => clearInterval(intervalId);
    }, [checkSession]);

    return (
        <LoginContext.Provider value={{ isLoggedIn, handleLogout, sessionId, userId }}>
            {children}
        </LoginContext.Provider>
    );
}

export function useLogin() {
    const context = useContext(LoginContext);
    if (!context) {
        throw new Error('useLogin must be used within a LoginProvider');
    }
    return context;
}

function App() {
    return (
        <Router>
            <LoginProvider>
                <div className="app-container">
                    <Header className='header'/>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/profile" element={<ProfilePage/>}/>
                        <Route path="/projects" element={<Projects/>}/>
                        <Route path="/project" element={<ProjectPage/>}/>
                        <Route path="/project-management" element={<ProjectManagement/>}/>
                        <Route path="/spheres" element={<Spheres/>}/>
                        <Route path="/sphere" element={<SpherePage/>}/>
                        <Route path="/sphere-management" element={<SphereManagement/>}/>
                        <Route path="/unions" element={<Unions/>}/>
                        <Route path="/union" element={<UnionPage/>}/>
                        <Route path="/union-management" element={<UnionManagement/>}/>
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
                        <Route path="/user" element={<UserPage/>}/>
                        <Route path="/register" element={<div className='container'><UserRegistration/></div>}/>
                        <Route path="/login" element={<div className='container'><UserLogin/></div>}/>
                        <Route path="*" element={<div className='container'><NotFound/></div>} />
                    </Routes>
                    <Footer className='footer'/>
                </div>
            </LoginProvider>
        </Router>
    );
}

export default App;
