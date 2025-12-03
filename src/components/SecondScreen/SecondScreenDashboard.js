import React, { useState } from 'react';
import { LayoutGrid, Navigation, Lightbulb, HelpCircle, X } from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import CategoriesSection from './CategoriesSection';
import VendorList from './VendorList';
import LabelKPIs from './LabelKPIs';
import PharmaChordDiagram from '../Overview/PharmaChodDiagram';
import EnhancedCircuitFlow from './EnhancedCircuitFlow';
import ProductImprovement from './ProductImprovement';

const SecondScreenDashboard = ({ selectedLabel, onLabelChange, onRibbonClick, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'journey', label: 'Product Journey', icon: Navigation },
    { id: 'improvement', label: 'Product Improvement', icon: Lightbulb }
  ];

  const InteractiveGuide = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showGuide ? '' : 'hidden'}`}>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl max-h-[85vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Understanding the Flow Chart</h2>
            <button onClick={() => setShowGuide(false)} className="p-2 hover:bg-slate-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">How to Read the Chart</h3>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p><strong>Left Side:</strong> Medicine categories (Emergency, OT, Ward, Daycare, General, Implant)</p>
                <p><strong>Right Side:</strong> Destinations (Areas, Specialities, or Wards based on filter)</p>
                <p><strong>Ribbons:</strong> Show the flow/connection between categories and destinations</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Ribbon Styling</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="font-semibold mb-2">Color = Movement Speed</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-green-500" /> Fast</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-yellow-500" /> Medium</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-orange-500" /> Slow</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-red-500" /> Occasional</div>
                  </div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="font-semibold mb-2">Thickness = Consumption</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2"><div className="w-6 h-2 rounded bg-slate-500" /> Over-consumption</div>
                    <div className="flex items-center gap-2"><div className="w-4 h-2 rounded bg-slate-500" /> Normal</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded bg-slate-500" /> Under-consumption</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Interactions</h3>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-sm"><strong>Hover:</strong> View detailed information about flows</p>
                <p className="text-sm"><strong>Click Ribbon:</strong> Navigate to RCA & Recommendations screen</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          ← Back to Label Dashboard
        </button>
        <h2 className="text-xl font-bold text-slate-800">
          {selectedLabel?.name || 'All Labels'} Dashboard
        </h2>
      </div>

      <GlobalSearch
        selectedLabel={selectedLabel}
        onLabelChange={onLabelChange}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex gap-3 border-b border-slate-200 pb-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-t-lg transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => setShowGuide(true)}
          className="ml-auto flex items-center gap-2 px-3 py-2 text-slate-500 hover:text-blue-600 transition-colors"
        >
          <HelpCircle className="w-4 h-4" />
          <span className="text-sm">Guide</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <PharmaChordDiagram 
              selectedLabel={selectedLabel}
              onRibbonClick={onRibbonClick}
            />
            <CategoriesSection selectedLabel={selectedLabel} />
            <VendorList selectedLabel={selectedLabel} />
            <LabelKPIs selectedLabel={selectedLabel} />
          </div>
        )}
        
        {activeTab === 'journey' && (
          <EnhancedCircuitFlow selectedLabel={selectedLabel} />
        )}
        
        {activeTab === 'improvement' && (
          <ProductImprovement selectedLabel={selectedLabel} />
        )}
      </div>

      <InteractiveGuide />
    </div>
  );
};

export default SecondScreenDashboard;