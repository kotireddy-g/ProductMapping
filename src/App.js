import React, { useState, useEffect } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import DetailDrawer from './components/DetailDrawer';
import LabelDashboard from './components/FirstScreen/LabelDashboard';
import SecondScreenDashboard from './components/SecondScreen/SecondScreenDashboard';
import RCAScreen from './components/ThirdScreen/RCAScreen';
import ForecastModal from './components/VendorForecast/ForecastModal';
import UploadModal from './components/Upload/UploadModal';
import NotificationBell from './components/Notifications/NotificationBell';
import NotificationToast from './components/Notifications/NotificationToast';
import GlobalSearchBar from './components/GlobalSearchBar';
import { TrendingUp, User, LogOut, Upload, Bell } from 'lucide-react';
import { dataSet1, dataSet2, notifications } from './data/syntheticDataSets';
import { getOtifColor } from './utils/otifColors';
import ExperienceFlowLogo from './assets/experienceflow-logo.svg';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [currentScreen, setCurrentScreen] = useState('first');
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedFlow, setSelectedFlow] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isForecastOpen, setIsForecastOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  
  // Data management
  const [currentDataSet, setCurrentDataSet] = useState(1);
  const [currentOtif, setCurrentOtif] = useState(88.9);
  
  // Notifications
  const [currentNotifications, setCurrentNotifications] = useState([]);
  const [toastNotifications, setToastNotifications] = useState([]);
  
  // Global search state
  const [globalSearchQuery, setGlobalSearchQuery] = useState('');
  const [showGlobalSuggestions, setShowGlobalSuggestions] = useState(false);
  const [globalFilteredSuggestions, setGlobalFilteredSuggestions] = useState([]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
    // Show initial notifications after login
    setTimeout(() => {
      showLoginNotifications();
    }, 2000);
  };

  const handleSignup = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setAuthView('login');
    setCurrentScreen('first');
    setSelectedLabel(null);
  };

  const handleLabelSelect = (label) => {
    setSelectedLabel(label);
    setCurrentScreen('second');
  };

  const handleLabelChange = (label) => {
    setSelectedLabel(label);
  };

  const handleRibbonClick = (flowData) => {
    setSelectedFlow(flowData);
    setCurrentScreen('third');
  };

  const handleBackToFirst = () => {
    setCurrentScreen('first');
    setSelectedLabel(null);
  };

  const handleBackToSecond = () => {
    setCurrentScreen('second');
    setSelectedFlow(null);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  // Show notifications on login
  const showLoginNotifications = () => {
    const notifs = currentDataSet === 1 ? notifications.dataSet1 : notifications.dataSet2;
    setCurrentNotifications(notifs.map(n => ({ ...n, read: false })));
    
    // Show toast notifications one by one
    notifs.slice(0, 5).forEach((notif, index) => {
      setTimeout(() => {
        setToastNotifications(prev => [...prev, { ...notif, read: false }]);
      }, index * 2000);
    });
  };

  // Handle upload completion
  const handleUploadComplete = () => {
    const newDataSet = currentDataSet === 1 ? 2 : 1;
    setCurrentDataSet(newDataSet);
    setCurrentOtif(newDataSet === 1 ? 88.9 : 97.1);
    
    // Update notifications
    const newNotifs = newDataSet === 1 ? notifications.dataSet1 : notifications.dataSet2;
    setCurrentNotifications(newNotifs.map(n => ({ ...n, read: false })));
    
    // Show success toast notifications
    setTimeout(() => {
      newNotifs.slice(0, 3).forEach((notif, index) => {
        setTimeout(() => {
          setToastNotifications(prev => [...prev, { ...notif, read: false }]);
        }, index * 1500);
      });
    }, 1000);
  };

  // Notification handlers
  const handleMarkAsRead = (notificationId) => {
    setCurrentNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
  };

  const handleDismissNotification = (notificationId) => {
    setCurrentNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const handleDismissToast = (notificationId) => {
    setToastNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const addToastNotification = (notification) => {
    const id = Date.now();
    const newNotification = { ...notification, id };
    setToastNotifications(prev => [...prev, newNotification]);
    
    setTimeout(() => {
      setToastNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Global search handlers
  const handleGlobalSearchChange = (e) => {
    const query = e.target.value;
    setGlobalSearchQuery(query);
    
    if (query.length > 0) {
      // Import search suggestions from LabelDashboard data
      import('./data/coreLabelsData').then(({ searchSuggestions }) => {
        const filtered = searchSuggestions.filter(suggestion =>
          suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
          suggestion.description.toLowerCase().includes(query.toLowerCase())
        );
        setGlobalFilteredSuggestions(filtered.slice(0, 8));
        setShowGlobalSuggestions(true);
      });
    } else {
      setShowGlobalSuggestions(false);
      setGlobalFilteredSuggestions([]);
    }
  };

  const handleGlobalSuggestionSelect = (suggestion) => {
    setGlobalSearchQuery(suggestion.name);
    setShowGlobalSuggestions(false);
    // Navigate based on suggestion
    handleLabelSelect({ 
      ...suggestion, 
      searchType: suggestion.type,
      searchQuery: suggestion.name 
    });
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

  if (currentScreen === 'third') {
    return (
      <RCAScreen 
        flowData={selectedFlow}
        onBack={handleBackToSecond}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                <img 
                  src={ExperienceFlowLogo} 
                  alt="ExperienceFlow" 
                  className="w-10 h-10 rounded-xl"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  ExperienceFlow
                </h1>
                <p className="text-xs text-slate-500">Hospital Pharma Procurement</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Upload Button */}
              <button
                onClick={() => setIsUploadOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm"
              >
                <Upload className="w-4 h-4" />
                Upload Data
              </button>
              
              {/* Notification Bell */}
              <NotificationBell 
                notifications={currentNotifications}
                onMarkAsRead={handleMarkAsRead}
                onDismiss={handleDismissNotification}
              />
              
              <button
                onClick={() => setIsForecastOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm"
              >
                <TrendingUp className="w-4 h-4" />
                Supplier Forecast
              </button>
              
              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    {currentUser?.name || 'User'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Global Search Bar */}
      <GlobalSearchBar
        currentOtif={currentOtif}
        searchQuery={globalSearchQuery}
        onSearchChange={handleGlobalSearchChange}
        showSuggestions={showGlobalSuggestions}
        filteredSuggestions={globalFilteredSuggestions}
        onSuggestionSelect={handleGlobalSuggestionSelect}
        onSearchFocus={() => setShowGlobalSuggestions(globalSearchQuery.length > 0)}
        onSearchBlur={() => setTimeout(() => setShowGlobalSuggestions(false), 200)}
      />

      <div className="max-w-7xl mx-auto px-6 py-4">
        {currentScreen === 'first' && (
          <LabelDashboard 
            onLabelSelect={handleLabelSelect} 
            currentDataSet={currentDataSet}
          />
        )}

        {currentScreen === 'second' && (
          <SecondScreenDashboard
            selectedItem={selectedLabel}
            onBack={handleBackToFirst}
            currentDataSet={currentDataSet}
          />
        )}
      </div>

      {isDrawerOpen && selectedProduct && (
        <DetailDrawer
          product={selectedProduct}
          onClose={handleCloseDrawer}
        />
      )}

      <ForecastModal 
        isOpen={isForecastOpen}
        onClose={() => setIsForecastOpen(false)}
      />

      <UploadModal 
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toastNotifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            notification={notification}
            onDismiss={handleDismissToast}
          />
        ))}
      </div>
    </div>
  );
}

export default App;