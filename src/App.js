import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Header from './components/Layout/Header';
import NotificationPanel from './components/Layout/NotificationPanel';
import UploadModal from './components/Layout/UploadModal';
import MainDashboard from './components/Dashboard/MainDashboard';
import ProductJourneyScreen from './components/Dashboard/ProductJourneyScreen';
import RCAScreen from './components/Dashboard/RCAScreen';
import { notifications as initialNotifications } from './data/unifiedPharmaData';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rcaData, setRcaData] = useState(null);
  
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setAuthView('login');
    setCurrentScreen('dashboard');
  };

  const handleNavigateToRCA = (data) => {
    setRcaData(data);
    setCurrentScreen('rca');
  };

  const handleNavigateToProductJourney = (category) => {
    setSelectedCategory(category);
    setCurrentScreen('product-journey');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedCategory(null);
    setRcaData(null);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const handleUploadComplete = () => {
    const newNotification = {
      id: Date.now(),
      type: 'forecast',
      title: 'Forecast Updated',
      message: 'New forecast data has been uploaded successfully',
      severity: 'info',
      timestamp: new Date().toISOString(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  if (!isAuthenticated) {
    if (authView === 'login') {
      return (
        <Login 
          onLogin={handleLogin} 
          onSwitchToSignup={() => setAuthView('signup')} 
        />
      );
    }
    return (
      <Signup 
        onSignup={handleSignup} 
        onSwitchToLogin={() => setAuthView('login')} 
      />
    );
  }

  if (currentScreen === 'product-journey') {
    return (
      <ProductJourneyScreen 
        category={selectedCategory}
        onBack={handleBackToDashboard}
      />
    );
  }

  if (currentScreen === 'rca') {
    return (
      <RCAScreen 
        data={rcaData}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        currentUser={currentUser}
        notifications={notifications}
        onUploadClick={() => setIsUploadOpen(true)}
        onNotificationClick={() => setIsNotificationOpen(true)}
        onLogout={handleLogout}
      />

      <MainDashboard 
        onNavigateToRCA={handleNavigateToRCA}
        onNavigateToProductJourney={handleNavigateToProductJourney}
      />

      <NotificationPanel 
        isOpen={isNotificationOpen}
        notifications={notifications}
        onClose={() => setIsNotificationOpen(false)}
        onMarkAsRead={handleMarkAsRead}
        onNavigate={(notification) => {
          setIsNotificationOpen(false);
          if (notification.type === 'stockout' || notification.type === 'low_stock') {
            handleNavigateToProductJourney({ name: 'All Categories' });
          }
        }}
      />

      <UploadModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}

export default App;
