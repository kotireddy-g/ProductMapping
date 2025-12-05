import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

const KPICard = ({ kpi }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const stepValue = kpi.value / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayValue(kpi.value);
        clearInterval(timer);
      } else {
        setDisplayValue(stepValue * currentStep);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [kpi.value]);

  const formatValue = (val) => {
    if (kpi.unit === '%') return val.toFixed(1);
    if (kpi.unit === 'Cr') return `₹${val.toFixed(1)}`;
    if (kpi.unit === 'hrs') return val.toFixed(1);
    return Math.round(val);
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-slate-600 transition-all">
      <div className="flex justify-between items-start mb-3">
        <span className="text-slate-400 text-sm font-medium">{kpi.title}</span>
        <div className={`flex items-center gap-1 text-xs font-medium ${
          kpi.trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          {kpi.trend === 'up' ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {Math.abs(kpi.change)}%
        </div>
      </div>
      
      <div className="flex items-baseline gap-1 mb-3">
        <span className="text-2xl font-bold text-white">
          {formatValue(displayValue)}
        </span>
        <span className="text-slate-400 text-sm">{kpi.unit}</span>
      </div>

      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={kpi.trendData}>
            <Tooltip
              contentStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              labelStyle={{ color: '#94a3b8' }}
              itemStyle={{ color: kpi.color }}
              formatter={(value) => [value.toFixed(1), kpi.title]}
              labelFormatter={(label) => `Day ${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={kpi.color}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: kpi.color }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KPICard;
