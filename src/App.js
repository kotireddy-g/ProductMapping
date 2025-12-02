import React, { useState } from 'react';
import FilterPanel from './components/FilterPanel';
import ProductJourney from './components/ProductJourney';
import DetailDrawer from './components/DetailDrawer';
import ProductLabelingPanel from './components/ProductLabelingPanel';
import OverviewTab from './components/OverviewTab';
import { verticals, verticalDataMap, verticalRLHFProducts } from './data/verticalData';
import { ChevronDown, LayoutGrid, Navigation, Tags, Search } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all-products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
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
    setSelectedCategory('all');
    setSelectedLocation('all');
    setSearchQuery('');
  };

  const currentVerticalConfig = verticals[selectedVertical];
  const currentVerticalData = verticalDataMap[selectedVertical];
  const currentRLHFProducts = verticalRLHFProducts[selectedVertical];

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
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  ExperienceFlow
                </h1>
                <p className="text-sm text-slate-500 mt-1">Procurement Intelligence Platform</p>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowVerticalDropdown(!showVerticalDropdown)}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all shadow-sm"
                >
                  <span className="text-2xl">{currentVerticalConfig.icon}</span>
                  <div className="text-left">
                    <div className="font-semibold text-slate-800">{currentVerticalConfig.name}</div>
                    <div className="text-xs text-slate-500">{currentVerticalConfig.description}</div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showVerticalDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showVerticalDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                    {Object.entries(verticals).map(([key, vertical]) => (
                      <button
                        key={key}
                        onClick={() => handleVerticalChange(key)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors ${
                          selectedVertical === key ? 'bg-blue-50' : ''
                        }`}
                      >
                        <span className="text-2xl">{vertical.icon}</span>
                        <div>
                          <div className="font-semibold text-slate-800">{vertical.name}</div>
                          <div className="text-xs text-slate-500">{vertical.description}</div>
                        </div>
                        {selectedVertical === key && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-blue-500" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
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
              products={currentVerticalData} 
              verticalConfig={currentVerticalConfig}
              selectedVertical={selectedVertical}
              searchQuery={searchQuery}
            />
          )}
          
          {activeSection === 'journey' && (
            <>
              <div className="mb-6">
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
          )}
          
          {activeSection === 'labeling' && (
            <ProductLabelingPanel
              rlProducts={currentRLHFProducts}
              verticalConfig={currentVerticalConfig}
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
