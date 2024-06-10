import React, { useState } from 'react';
import '../styles/Settings.css';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    username: 'Sam Altman',
    email: 'sam.altman@example.com',
    password: '',
    theme: 'light',
    language: 'en',
    emailNotifications: true,
    smsNotifications: false,
    twoFactorAuth: true,
    publicProfile: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    console.log('Settings saved:', settings);
  };

  return (
      <div className="container">
        <aside className="settings-sidebar">
          <h2>Settings</h2>
        </aside>
        <main>
          <div className="settings-list">
            <section id="account-settings">
              <h3>Account Settings</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" id="username" name="username" value={settings.username} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" value={settings.email} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" name="password" value={settings.password} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn-orange">Save Changes</button>
              </form>
            </section>
            <section id="user-experience">
              <h3>User Experience</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="theme">Theme</label>
                  <select id="theme" name="theme" value={settings.theme} onChange={handleInputChange}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="language">Language</label>
                  <select id="language" name="language" value={settings.language} onChange={handleInputChange}>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
                <button type="submit" className="btn-orange">Save Changes</button>
              </form>
            </section>
            <section id="notifications">
              <h3>Notifications</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="emailNotifications">Email Notifications</label>
                  <input type="checkbox" id="emailNotifications" name="emailNotifications" checked={settings.emailNotifications} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="smsNotifications">SMS Notifications</label>
                  <input type="checkbox" id="smsNotifications" name="smsNotifications" checked={settings.smsNotifications} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn-orange">Save Changes</button>
              </form>
            </section>
            <section id="privacy-security">
              <h3>Privacy & Security</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="twoFactorAuth">Two-Factor Authentication</label>
                  <input type="checkbox" id="twoFactorAuth" name="twoFactorAuth" checked={settings.twoFactorAuth} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="publicProfile">Public Profile</label>
                  <input type="checkbox" id="publicProfile" name="publicProfile" checked={settings.publicProfile} onChange={handleInputChange} />
                </div>
                <button type="submit" className="btn-orange">Save Changes</button>
              </form>
            </section>
          </div>
        </main>
        </div>
  );
};

export default SettingsPage;
