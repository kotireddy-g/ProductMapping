import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ProductJourney from './components/ProductJourney';
import DetailDrawer from './components/DetailDrawer';
import ProductLabelingPanel from './components/ProductLabelingPanel';
import OverviewTab from './components/OverviewTab';
import { mockRLProducts, mockProductData } from './data/mockData';
import { verticals, verticalDataMap, verticalRLHFProducts } from './data/verticalData';
import { ChevronDown } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all-products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedVertical, setSelectedVertical] = useState('hospitality');
  const [showVerticalDropdown, setShowVerticalDropdown] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleVerticalChange = (vertical) => {
    setSelectedVertical(vertical);
    setShowVerticalDropdown(false);
    // Reset filters when changing vertical
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSearchQuery('');
  };

  // Get current vertical data
  const currentVerticalConfig = verticals[selectedVertical];
  const currentVerticalData = verticalDataMap[selectedVertical];
  const currentRLHFProducts = verticalRLHFProducts[selectedVertical];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">ExperienceFlow</h1>
                <p className="text-sm text-slate-600 mt-1">Multi-Vertical Procurement Intelligence Platform</p>
              </div>
              
              {/* Vertical Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowVerticalDropdown(!showVerticalDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg border border-slate-300 hover:from-slate-200 hover:to-slate-300 transition-all"
                  style={{ borderColor: currentVerticalConfig.color }}
                >
                  <span className="text-2xl">{currentVerticalConfig.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold text-slate-900">{currentVerticalConfig.name}</div>
                    <div className="text-xs text-slate-600">{currentVerticalConfig.description}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-600 transition-transform ${showVerticalDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showVerticalDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 z-50">
                    {Object.entries(verticals).map(([key, vertical]) => (
                      <button
                        key={key}
                        onClick={() => handleVerticalChange(key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                          selectedVertical === key ? 'bg-blue-50 border-l-4' : 'border-l-4 border-transparent'
                        }`}
                        style={{ borderLeftColor: selectedVertical === key ? vertical.color : 'transparent' }}
                      >
                        <span className="text-2xl">{vertical.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-900">{vertical.name}</div>
                          <div className="text-xs text-slate-600">{vertical.description}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold" style={{ color: currentVerticalConfig.color }}>RLHF</div>
              <p className="text-xs text-slate-500">Reinforcement Learning Human Feedback</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'text-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
              style={{ 
                borderBottomColor: activeTab === 'overview' ? currentVerticalConfig.color : 'transparent',
                color: activeTab === 'overview' ? currentVerticalConfig.color : undefined
              }}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'journey'
                  ? 'text-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
              style={{ 
                borderBottomColor: activeTab === 'journey' ? currentVerticalConfig.color : 'transparent',
                color: activeTab === 'journey' ? currentVerticalConfig.color : undefined
              }}
            >
              Product Journey
            </button>
            <button
              onClick={() => setActiveTab('labeling')}
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'labeling'
                  ? 'text-slate-900'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
              style={{ 
                borderBottomColor: activeTab === 'labeling' ? currentVerticalConfig.color : 'transparent',
                color: activeTab === 'labeling' ? currentVerticalConfig.color : undefined
              }}
            >
              Product Labeling (RLHF)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' ? (
          <OverviewTab 
            products={currentVerticalData} 
            verticalConfig={currentVerticalConfig}
            selectedVertical={selectedVertical}
          />
        ) : activeTab === 'journey' ? (
          <>
            {/* Global Search */}
            <div className="mb-8">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Filter Panel */}
            <div className="mb-8">
              <FilterPanel
                filterType={filterType}
                setFilterType={setFilterType}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                verticalConfig={currentVerticalConfig}
              />
            </div>

            {/* Product Journey */}
            <ProductJourney
              filterType={filterType}
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
              searchQuery={searchQuery}
              onProductClick={handleProductClick}
              verticalData={currentVerticalData}
              verticalConfig={currentVerticalConfig}
            />
          </>
        ) : (
          <ProductLabelingPanel
            rlProducts={currentRLHFProducts}
            verticalConfig={currentVerticalConfig}
          />
        )}
      </div>

      {/* Detail Drawer */}
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
