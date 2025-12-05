import React, { useState } from 'react';
import { ArrowLeft, Filter, Download, RefreshCw } from 'lucide-react';

const ForecastReviewPage = ({ onBack, selectedNode }) => {
  const [filters, setFilters] = useState({
    location: 'All',
    timeBucket: 'Week',
    priority: 'All',
    status: 'All'
  });

  // Sample forecast data
  const forecastData = [
    {
      id: 1,
      sku: 'Inj. Ceftriaxone 1g',
      code: 'INJ-CEF-001',
      location: 'ICU Pharmacy – Hospital A',
      forecast: '420 vials',
      currentPlan: '380 vials',
      keyKpis: { otif: 'High', expiry: 'Low' },
      delta: 'Demand trend +23% vs last week',
      status: 'critical',
      priority: 'CRITICAL',
      action: 'Review / Override'
    },
    {
      id: 2,
      sku: 'Tab. Paracetamol 500mg',
      code: 'TAB-PARA-500',
      location: 'Ward 3 – Hospital A',
      forecast: '2,400 tablets',
      currentPlan: '2,400 tablets',
      keyKpis: { otif: 'Low', expiry: 'Low' },
      delta: 'Stable',
      status: 'medium',
      priority: 'MEDIUM',
      action: 'Review / Override'
    },
    {
      id: 3,
      sku: 'Multivitamin Syrup 200ml',
      code: 'SYR-MULT-200',
      location: 'OPD Pharmacy – Hospital A',
      forecast: '800 bottles',
      currentPlan: '600 bottles',
      keyKpis: { otif: 'Low', expiry: 'High' },
      delta: 'Campaign ended',
      status: 'low',
      priority: 'LOW',
      action: 'Review / Override'
    },
    {
      id: 4,
      sku: 'Inj. Morphine 10mg',
      code: 'INJ-MOR-010',
      location: 'ICU – Hospital A',
      forecast: '150 vials',
      currentPlan: '120 vials',
      keyKpis: { otif: 'Medium', expiry: 'Low' },
      delta: 'Usage pattern changed',
      status: 'medium',
      priority: 'MEDIUM',
      action: 'Review / Override'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'low': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-red-500 text-white';
      case 'MEDIUM': return 'bg-orange-500 text-white';
      case 'LOW': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getKpiColor = (level) => {
    switch (level) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Forecast Review & Actions</h1>
              <p className="text-sm text-gray-500 mt-1">
                Review AI forecasts and apply overrides to improve model accuracy
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters</span>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
            <select 
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>ICU Pharmacy</option>
              <option>Ward 3</option>
              <option>OPD Pharmacy</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Time Bucket</label>
            <select 
              value={filters.timeBucket}
              onChange={(e) => setFilters({...filters, timeBucket: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Week</option>
              <option>Month</option>
              <option>Quarter</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Priority</label>
            <select 
              value={filters.priority}
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>CRITICAL</option>
              <option>MEDIUM</option>
              <option>LOW</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select 
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All</option>
              <option>Critical</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    SKU / Item
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Forecast (System)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Plan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Key KPIs
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delta / Alert
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {forecastData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div>
                        <div className="font-medium text-gray-900">{item.sku}</div>
                        <div className="text-sm text-gray-500">{item.code}</div>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="text-sm text-gray-900">{item.location}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{item.forecast}</div>
                      <div className="text-xs text-red-500">↗ +40 vials</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{item.currentPlan}</div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">OTIF:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getKpiColor(item.keyKpis.otif)}`}>
                            {item.keyKpis.otif}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Expiry:</span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getKpiColor(item.keyKpis.expiry)}`}>
                            {item.keyKpis.expiry}
                          </span>
                        </div>
                        <div className="text-xs text-blue-600 mt-1">7d inv</div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${getStatusColor(item.status)}`}>
                        <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                        {item.delta}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        {item.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastReviewPage;
