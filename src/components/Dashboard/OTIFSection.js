import React, { useState } from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, ChevronRight } from 'lucide-react';
import AnimatedChordDiagram from './AnimatedChordDiagram';
import KPICard from './KPICard';
import { otifMetrics, otifKPIs, medicineCategories } from '../../data/unifiedPharmaData';

const OTIFSection = ({ onNavigateToRCA }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const getOtifColor = (otif) => {
    if (otif >= 95) return 'text-green-400 bg-green-400/10';
    if (otif >= 85) return 'text-yellow-400 bg-yellow-400/10';
    return 'text-red-400 bg-red-400/10';
  };

  const handleReasonClick = (reason) => {
    if (onNavigateToRCA) {
      onNavigateToRCA({ type: 'otif_reason', data: reason });
    }
  };

  return (
    <div className="space-y-6">
      <AnimatedChordDiagram
        onCategoryClick={setSelectedCategory}
        onDepartmentClick={setSelectedDepartment}
      />

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold">OTIF Performance by Category</h3>
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Overall OTIF:</span>
            <span className="text-2xl font-bold text-green-400">{otifMetrics.overall}%</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 text-sm font-medium">Category</th>
                <th className="text-center py-3 px-4 text-slate-400 text-sm font-medium">OTIF %</th>
                <th className="text-center py-3 px-4 text-slate-400 text-sm font-medium">On-Time</th>
                <th className="text-center py-3 px-4 text-slate-400 text-sm font-medium">In-Full</th>
                <th className="text-center py-3 px-4 text-slate-400 text-sm font-medium">Orders</th>
                <th className="text-center py-3 px-4 text-slate-400 text-sm font-medium">Delayed</th>
                <th className="text-right py-3 px-4 text-slate-400 text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {otifMetrics.byCategory.map((cat, index) => (
                <tr 
                  key={index}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer"
                  onClick={() => handleReasonClick(cat)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="text-white font-medium">{cat.category}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getOtifColor(cat.otif)}`}>
                        {cat.otif}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center text-slate-300">{cat.onTime}%</td>
                  <td className="py-3 px-4 text-center text-slate-300">{cat.inFull}%</td>
                  <td className="py-3 px-4 text-center text-slate-300">{cat.orders.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-red-400">{cat.delayed}</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <ChevronRight className="w-5 h-5 text-slate-500 inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
        <h3 className="text-white font-semibold mb-4">Top OTIF Issue Reasons</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {otifMetrics.reasons.map((reason, index) => (
            <div
              key={index}
              onClick={() => handleReasonClick(reason)}
              className="p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors cursor-pointer border border-slate-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className={`w-4 h-4 ${
                  reason.impact === 'High' ? 'text-red-400' : 
                  reason.impact === 'Medium' ? 'text-yellow-400' : 'text-blue-400'
                }`} />
                <span className={`text-xs px-2 py-0.5 rounded ${
                  reason.impact === 'High' ? 'bg-red-400/20 text-red-400' : 
                  reason.impact === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' : 'bg-blue-400/20 text-blue-400'
                }`}>
                  {reason.impact}
                </span>
              </div>
              <p className="text-white text-sm font-medium truncate">{reason.reason}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-slate-400 text-xs">{reason.count} cases</span>
                <span className="text-slate-300 text-sm font-semibold">{reason.percentage}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {otifKPIs.map((kpi) => (
          <KPICard key={kpi.id} kpi={kpi} />
        ))}
      </div>
    </div>
  );
};

export default OTIFSection;
