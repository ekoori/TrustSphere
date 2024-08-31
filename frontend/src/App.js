// File: ./frontend/src/App.js
// Description: This is the main component where routing is set up and different page components & layout components are loaded based on routing.
// Classes/Methods/Properties: 
//    [+] App - The main layout of the application, including routing.
//    [+] LoginProvider - Provides the logged-in state throughout the app using Context API.
//        [+] Properties:
//            [+] isLoggedIn - stores the user's logged-in state.
//            [+] userId - stores the current user's ID.
//        [+] Methods:
//            [+] handleLogout() - Logs out the user, clears the session, and navigates to the login page.
//            [+] checkSession() - Checks if the user is logged in by validating the session_id from the backend.
//        [+] useLogin() - Custom hook that provides access to the login context.


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
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await api.post('/api/logout', {}, {
                withCredentials: true,
            });
            if (response.data.success) {
                console.log('Logout successful');
                setIsLoggedIn(false);  // Update login state
                setUserId(null);  // Clear user ID
                navigate('/login');  // Redirect to login page
            } else {
                console.error('Logout failed:', response.data.message);
                alert('Logout failed: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error during logout:', error);
            alert('Error during logout: ' + error.message);
        }
    };
    
    

    const checkSession = useCallback(async () => {
        try {
            const response = await api.get('/api/check_session', {
                withCredentials: true
            });
            console.log('Check session response:', response.data);
            if (response.data.status === 'active' && response.data.user_id) {
                setIsLoggedIn(true);
                setUserId(response.data.user_id);
            } else {
                console.log('No active session found');
                setIsLoggedIn(false);
                setUserId(null);
            }
        } catch (error) {
            console.info('No active session or error checking session:', error);
            setIsLoggedIn(false);
            setUserId(null);
        }
    }, []);
    
    

    useEffect(() => {
        checkSession();
        const intervalId = setInterval(checkSession, 5 * 60 * 1000); // Check every 5 minutes
        return () => clearInterval(intervalId);
    }, [checkSession]);

    return (
        <LoginContext.Provider value={{ isLoggedIn, handleLogout, setIsLoggedIn, userId, setUserId }}>
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
