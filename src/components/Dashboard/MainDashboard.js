import React, { useState } from 'react';
import { BarChart3, AlertTriangle, TrendingUp } from 'lucide-react';
import OTIFSection from './OTIFSection';
import LabelsSection from './LabelsSection';
import ForecastSection from './ForecastSection';

const MainDashboard = ({ onNavigateToRCA, onNavigateToProductJourney, onNavigateToForecastReview }) => {
  const [activeSection, setActiveSection] = useState('otif');
  
  // Data for tab counts and OTIF percentage
  const overallOTIF = 92.4;
  const stockoutCount = 15; // Number of items with stockout issues
  const forecastCount = 46; // Number of forecasts generated

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex border-b border-slate-200 bg-white">
        <button
          onClick={() => setActiveSection('otif')}
          className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
            activeSection === 'otif'
              ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <BarChart3 size={18} />
            OTIF ({overallOTIF}%)
          </span>
        </button>
        <button
          onClick={() => setActiveSection('labels')}
          className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
            activeSection === 'labels'
              ? 'bg-orange-50 text-orange-700 border-b-2 border-orange-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <AlertTriangle size={18} />
            Actions ({stockoutCount})
          </span>
        </button>
        <button
          onClick={() => setActiveSection('forecast')}
          className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
            activeSection === 'forecast'
              ? 'bg-green-50 text-green-700 border-b-2 border-green-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <TrendingUp size={18} />
            Improvement ({forecastCount})
          </span>
        </button>
      </div>

      <div className="p-6">
        {activeSection === 'otif' && (
          <OTIFSection onNavigateToRCA={onNavigateToRCA} />
        )}
        {activeSection === 'labels' && (
          <LabelsSection onNavigateToRCA={onNavigateToRCA} />
        )}
        {activeSection === 'forecast' && (
          <ForecastSection 
            onNavigateToRCA={onNavigateToRCA}
            onNavigateToProductJourney={onNavigateToProductJourney}
            onNavigateToForecastReview={onNavigateToForecastReview}
          />
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
