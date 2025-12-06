import React, { useState } from 'react';
import OTIFSection from './OTIFSection';
import LabelsSection from './LabelsSection';
import ForecastSection from './ForecastSection';

const MainDashboard = ({ onNavigateToRCA, onNavigateToProductJourney }) => {
  const [activeSection, setActiveSection] = useState('otif');

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
            <span className="text-xl">📊</span>
            OTIF
          </span>
        </button>
        <button
          onClick={() => setActiveSection('labels')}
          className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
            activeSection === 'labels'
              ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <span className="text-xl">🏷️</span>
            Labels
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
            <span className="text-xl">📈</span>
            Forecast
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
          />
        )}
      </div>
    </div>
  );
};

export default MainDashboard;
