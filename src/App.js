import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import ProductJourney from './components/ProductJourney';
import DetailDrawer from './components/DetailDrawer';
import ProductLabelingPanel from './components/ProductLabelingPanel';
import { mockRLProducts } from './data/mockData';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all-products');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('journey');

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Procurement Model</h1>
              <p className="text-sm text-slate-600 mt-1">Hospitality Product Management & Labeling</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">RLHL</div>
              <p className="text-xs text-slate-500">Reinforcement Learning Hospitality Labeling</p>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('journey')}
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'journey'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Product Journey
            </button>
            <button
              onClick={() => setActiveTab('labeling')}
              className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'labeling'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Product Labeling (RL)
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'journey' ? (
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
              />
            </div>

            {/* Product Journey */}
            <ProductJourney
              filterType={filterType}
              selectedCategory={selectedCategory}
              selectedLocation={selectedLocation}
              searchQuery={searchQuery}
              onProductClick={handleProductClick}
            />
          </>
        ) : (
          <ProductLabelingPanel
            rlProducts={mockRLProducts}
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
