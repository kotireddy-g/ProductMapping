import React, { useState, useMemo } from 'react';
import { Search, Zap, Heart, DollarSign, Clock, Shield, TrendingUp, AlertTriangle, Package } from 'lucide-react';
import { coreLabels, calculateOverallMetrics, getPriorityColor, searchSuggestions } from '../../data/coreLabelsData';

const LabelDashboard = ({ onLabelSelect, currentDataSet = 1 }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  
  // Get current data set metrics
  const metrics = useMemo(() => calculateOverallMetrics(currentDataSet), [currentDataSet]);
  
  // Get labels with current data set values
  const currentLabels = useMemo(() => {
    return coreLabels.map(label => ({
      ...label,
      ...label[`dataSet${currentDataSet}`]
    }));
  }, [currentDataSet]);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.length > 0) {
      const filtered = searchSuggestions.filter(suggestion =>
        suggestion.name.toLowerCase().includes(query.toLowerCase()) ||
        suggestion.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered.slice(0, 8)); // Limit to 8 suggestions
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
      setFilteredSuggestions([]);
    }
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.name);
    setShowSuggestions(false);
    // Navigate to second screen with the selected suggestion
    onLabelSelect({ 
      ...suggestion, 
      searchType: suggestion.type,
      searchQuery: suggestion.name 
    });
  };

  // Icon mapping
  const getIcon = (iconName) => {
    const icons = {
      'Zap': Zap,
      'Heart': Heart,
      'DollarSign': DollarSign,
      'Clock': Clock,
      'Shield': Shield,
      'TrendingUp': TrendingUp,
      'AlertTriangle': AlertTriangle,
      'Package': Package
    };
    return icons[iconName] || AlertTriangle;
  };

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
        {/* Search Bar with Auto-suggestions */}
        <div className="relative max-w-2xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by KPIs (OTIF), Categories (ICU, OT), or Labels..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {/* Auto-suggestions Dropdown */}
          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion.id}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="px-4 py-3 hover:bg-slate-50 cursor-pointer border-b border-slate-100 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-900">{suggestion.name}</p>
                      <p className="text-sm text-slate-500">{suggestion.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      suggestion.type === 'kpi' ? 'bg-blue-100 text-blue-700' :
                      suggestion.type === 'category' ? 'bg-green-100 text-green-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {suggestion.type.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Priority Counts */}
        <div className="flex justify-center gap-8 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>High Priority (P0): {metrics.priorityCounts.P0}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span>Medium Priority (P1): {metrics.priorityCounts.P1}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>Normal: {metrics.priorityCounts.Normal}</span>
          </div>
        </div>
      </div>

      {/* Core Labels Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentLabels.map((label) => {
          const IconComponent = getIcon(label.icon);
          const priorityColors = getPriorityColor(label.priority);
          
          return (
            <div
              key={label.id}
              onClick={() => onLabelSelect(label)}
              className={`${priorityColors.bg} ${priorityColors.border} border-2 rounded-xl p-6 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-white rounded-lg shadow-sm`}>
                  <IconComponent className={`w-6 h-6 ${priorityColors.icon}`} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${priorityColors.badge}`}>
                  {label.priority}
                </span>
              </div>
              
              <h3 className={`text-lg font-bold ${priorityColors.text} mb-2`}>
                {label.name}
              </h3>
              
              <p className="text-sm text-slate-600 mb-4">
                {label.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">OTIF:</span>
                  <span className={`font-bold ${priorityColors.text}`}>
                    {label.otifPercentage.toFixed(1)}%
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Products:</span>
                  <span className="font-medium text-slate-700">
                    {label.affectedProducts}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Value:</span>
                  <span className="font-medium text-slate-700">
                    ₹{(label.totalValue / 100000).toFixed(1)}L
                  </span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">Category:</span>
                  <span className="text-xs font-medium text-slate-600">
                    {label.category}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LabelDashboard;