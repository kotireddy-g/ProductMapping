import React, { useMemo } from 'react';
import { Activity, Package, AlertCircle, TrendingUp, RefreshCw } from 'lucide-react';
import LabelCard from './LabelCard';
import { labelCategories, getHealthScore, getTotalStats } from '../../data/labelData';

const LabelDashboard = ({ onLabelSelect }) => {
  const healthScore = useMemo(() => getHealthScore(), []);
  const stats = useMemo(() => getTotalStats(), []);
  const lastUpdated = useMemo(() => new Date().toLocaleString(), []);

  const sortedLabels = useMemo(() => {
    const severityOrder = { critical: 0, moderate: 1, normal: 2 };
    return [...labelCategories].sort((a, b) => 
      severityOrder[a.severity] - severityOrder[b.severity]
    );
  }, []);

  const getHealthColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getHealthBg = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const formatValue = (value) => {
    if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    return `₹${value.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Procurement Health Overview</h1>
            <p className="text-sm text-slate-500 mt-1">
              Monitor and manage your inventory labels
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <RefreshCw className="w-4 h-4" />
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div className={`p-4 rounded-xl ${getHealthBg(healthScore)}`}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-white/50`}>
                <Activity className={`w-6 h-6 ${getHealthColor(healthScore)}`} />
              </div>
              <div>
                <p className="text-sm text-slate-600">Health Score</p>
                <p className={`text-2xl font-bold ${getHealthColor(healthScore)}`}>
                  {healthScore}<span className="text-lg">/100</span>
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/50">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total SKUs Affected</p>
                <p className="text-2xl font-bold text-blue-600">{stats.totalSKUs}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-purple-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/50">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">{formatValue(stats.totalValue)}</p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-orange-50">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-white/50">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Active Alerts</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activeAlerts}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedLabels.map((label) => (
          <LabelCard
            key={label.id}
            label={label}
            onClick={() => onLabelSelect(label)}
          />
        ))}
      </div>
    </div>
  );
};

export default LabelDashboard;