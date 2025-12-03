import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import DetailDrawer from './components/DetailDrawer';
import LabelDashboard from './components/FirstScreen/LabelDashboard';
import SecondScreenDashboard from './components/SecondScreen/SecondScreenDashboard';
import RCAScreen from './components/ThirdScreen/RCAScreen';
import ForecastModal from './components/VendorForecast/ForecastModal';
import { TrendingUp, User, LogOut } from 'lucide-react';

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
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🏥</span>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  ExperienceFlow
                </h1>
                <p className="text-xs text-slate-500">Hospital Pharma Procurement</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsForecastOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all shadow-sm"
              >
                <TrendingUp className="w-4 h-4" />
                Vendor Forecast
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

      <div className="max-w-7xl mx-auto px-6 py-6">
        {currentScreen === 'first' && (
          <LabelDashboard onLabelSelect={handleLabelSelect} />
        )}

        {currentScreen === 'second' && (
          <SecondScreenDashboard
            selectedLabel={selectedLabel}
            onLabelChange={handleLabelChange}
            onRibbonClick={handleRibbonClick}
            onBack={handleBackToFirst}
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
    </div>
  );
}

export default App;