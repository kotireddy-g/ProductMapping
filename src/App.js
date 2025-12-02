import React, { useState } from 'react';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import DetailDrawer from './components/DetailDrawer';
import ProductLabelingPanel from './components/ProductLabelingPanel';
import OverviewTab from './components/OverviewTab';
import LiveCircuitFlow from './components/ProductJourney/LiveCircuitFlow';
import { verticalRLHFProducts } from './data/verticalData';
import { LayoutGrid, Navigation, Tags, Search, LogOut, User } from 'lucide-react';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

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

  const verticalConfig = {
    name: 'Hospital Pharma',
    icon: '🏥',
    description: 'Hospitals & Pharmaceutical Supply',
    color: '#ef4444',
    departments: ['Emergency Meds', 'Surgery Supplies', 'ICU Equipment', 'General Pharmacy', 'Lab Reagents', 'Medical Devices'],
    locations: ['General Hospital', 'Specialty Clinic', 'Emergency Center', 'Surgical Wing', 'ICU Department', 'Outpatient Pharmacy', 'Research Lab', 'Pediatric Unit']
  };

  const currentRLHFProducts = verticalRLHFProducts.pharma;

  const sections = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid, description: 'Product flow visualization' },
    { id: 'journey', label: 'Product Journey', icon: Navigation, description: 'Track product performance' },
    { id: 'labeling', label: 'Product Labeling', icon: Tags, description: 'RLHF label management' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">🏥</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    ExperienceFlow
                  </h1>
                  <p className="text-sm text-slate-500">Hospital Pharma Procurement</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search products, categories, locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
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
        <div className="flex gap-3 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <div className="text-left">
                  <div className={`font-semibold ${isActive ? 'text-white' : 'text-slate-800'}`}>
                    {section.label}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {section.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          {activeSection === 'overview' && (
            <OverviewTab 
              searchQuery={searchQuery}
            />
          )}
          
          {activeSection === 'journey' && (
            <LiveCircuitFlow 
              onProductClick={handleProductClick}
            />
          )}
          
          {activeSection === 'labeling' && (
            <ProductLabelingPanel
              rlProducts={currentRLHFProducts}
              verticalConfig={verticalConfig}
            />
          )}
        </div>
      </div>

      {isDrawerOpen && selectedProduct && (
        <DetailDrawer
          product={selectedProduct}
          onClose={handleCloseDrawer}
        />
      )}
    </div>
  );
}

export default App;
