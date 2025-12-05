import React, { useState } from 'react';
import { Package, TrendingUp, TrendingDown, AlertTriangle, ChevronRight, BarChart3 } from 'lucide-react';
import KPICard from './KPICard';
import { medicineCategories, forecastData, forecastKPIs } from '../../data/unifiedPharmaData';

const ForecastSection = ({ onNavigateToRCA, onNavigateToProductJourney }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onNavigateToProductJourney) {
      onNavigateToProductJourney(category);
    }
  };

  const getVarianceColor = (variance) => {
    if (variance > 5) return 'text-red-400';
    if (variance < -5) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Medicine Categories</h3>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {medicineCategories.map((category) => {
            const categoryData = forecastData.byCategory.find(c => c.id === category.id);
            
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="p-4 rounded-xl bg-slate-700/50 hover:bg-slate-700 transition-all cursor-pointer border border-slate-600 hover:border-slate-500 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    <Package className="w-6 h-6" style={{ color: category.color }} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" />
                </div>
                
                <h4 className="text-white font-semibold mb-1">{category.name}</h4>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold" style={{ color: category.color }}>
                    {category.itemCount}
                  </span>
                  <span className="text-slate-400 text-sm">items</span>
                </div>

                {categoryData && (
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-600">
                    <div>
                      <p className="text-slate-400 text-xs">Accuracy</p>
                      <p className="text-white font-semibold">{categoryData.forecastAccuracy.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-slate-400 text-xs">Variance</p>
                      <p className={`font-semibold ${getVarianceColor(categoryData.variance)}`}>
                        {categoryData.variance > 0 ? '+' : ''}{categoryData.variance.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-xl p-5 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-400" />
            </div>
            <span className="text-slate-300 text-sm">Total Forecast Items</span>
          </div>
          <p className="text-3xl font-bold text-white">{forecastData.totalItems.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-xl p-5 border border-green-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <span className="text-slate-300 text-sm">Forecast Accuracy</span>
          </div>
          <p className="text-3xl font-bold text-white">{forecastData.accuracy}%</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-xl p-5 border border-yellow-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-yellow-400" />
            </div>
            <span className="text-slate-300 text-sm">Under-forecasted</span>
          </div>
          <p className="text-3xl font-bold text-white">{forecastData.underForecasted}</p>
        </div>

        <div className="bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-xl p-5 border border-red-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-slate-300 text-sm">Over-forecasted</span>
          </div>
          <p className="text-3xl font-bold text-white">{forecastData.overForecasted}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {forecastKPIs.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;
