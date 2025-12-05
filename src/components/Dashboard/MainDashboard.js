import React, { useState } from 'react';
import OTIFSection from './OTIFSection';
import LabelsSection from './LabelsSection';
import ForecastSection from './ForecastSection';

const MainDashboard = ({ onNavigateToRCA, onNavigateToProductJourney }) => {
  const [activeSection, setActiveSection] = useState('otif');

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setActiveSection('otif')}
          className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
            activeSection === 'otif'
              ? 'bg-slate-800 text-white border-b-2 border-blue-500'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
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
              ? 'bg-slate-800 text-white border-b-2 border-purple-500'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
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
              ? 'bg-slate-800 text-white border-b-2 border-green-500'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
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
