import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

const KpiCards = ({ kpiData = [] }) => {
  // Add safety check for kpiData
  if (!kpiData || kpiData.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No KPI data available
      </div>
    );
  }
  const getTrendIcon = (trend) => {
    return trend === 'improving' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getTrendColor = (current, target) => {
    if (current >= target) return 'text-green-600';
    if (current >= target * 0.9) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProgressColor = (current, target) => {
    if (current >= target) return 'bg-green-500';
    if (current >= target * 0.9) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const calculateProgress = (current, target) => {
    return Math.min(100, (current / target) * 100);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData.map((kpi) => (
        <div key={kpi.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-slate-600">{kpi.title}</h3>
            {getTrendIcon(kpi.trend)}
          </div>

          {/* Values */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Target</span>
              <span className="text-sm font-medium text-slate-700">
                {kpi.target}{kpi.unit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Current</span>
              <span className={`text-lg font-bold ${getTrendColor(kpi.current, kpi.target)}`}>
                {kpi.current}{kpi.unit}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Next Period Forecast</span>
              <span className="text-sm font-medium text-green-600">
                {kpi.forecast}{kpi.unit}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Progress to Target</span>
              <span>{calculateProgress(kpi.current, kpi.target).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(kpi.current, kpi.target)}`}
                style={{ width: `${Math.min(100, calculateProgress(kpi.current, kpi.target))}%` }}
              ></div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpi.chartData}>
                <XAxis 
                  dataKey="period" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 10, fill: '#64748b' }}
                />
                <YAxis hide />
                <Line 
                  type="monotone" 
                  dataKey="current" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ r: 3, fill: '#3b82f6' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ r: 3, fill: '#22c55e' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#64748b" 
                  strokeWidth={1}
                  strokeDasharray="2 2"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 text-xs text-slate-500 mt-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-1 bg-green-500 rounded" style={{ borderStyle: 'dashed' }}></div>
              <span>Forecast</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-px bg-slate-400" style={{ borderStyle: 'dashed' }}></div>
              <span>Target</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KpiCards;
