import React, { useState, useMemo } from 'react';
import { ArrowLeft, AlertTriangle, Clock, Target, Lightbulb, ChevronRight } from 'lucide-react';
import { getRCADataForContext } from '../../data/unifiedPharmaData';

const RCAScreen = ({ data, onBack }) => {
  const [selectedCause, setSelectedCause] = useState(null);

  const contextualRCAData = useMemo(() => getRCADataForContext(data), [data]);
  const causes = contextualRCAData.causes;
  const recommendations = contextualRCAData.recommendations;
  
  const getContextTitle = () => {
    if (data?.type === 'otif_reason') {
      return data.data?.reason || 'OTIF Issue';
    }
    if (data?.type === 'label') {
      return data.subLabel?.name || data.label?.name || 'Label Analysis';
    }
    return 'Analysis Details';
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High': return 'text-red-400 bg-red-400/20';
      case 'Medium': return 'text-yellow-400 bg-yellow-400/20';
      default: return 'text-blue-400 bg-blue-400/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'border-red-500 bg-red-500/10';
      case 'Medium': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-400" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">Root Cause Analysis & Recommendations</h1>
              <p className="text-sm text-slate-400">
                Analyzing: {getContextTitle()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Identified Root Causes</h2>
              <p className="text-sm text-slate-400">Click on a cause for detailed analysis</p>
            </div>
          </div>

          <div className="grid gap-4">
            {causes.map((cause, index) => (
              <div
                key={cause.id}
                onClick={() => setSelectedCause(cause)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedCause?.id === cause.id
                    ? 'border-white bg-slate-700'
                    : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{cause.cause}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getImpactColor(cause.impact)}`}>
                          {cause.impact} Impact
                        </span>
                        <span className="text-slate-400 text-sm">
                          {cause.probability}% probability
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-2 bg-slate-600 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${cause.probability}%` }}
                      />
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Recommendations</h2>
              <p className="text-sm text-slate-400">Actionable steps to address the issues</p>
            </div>
          </div>

          <div className="grid gap-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-4 rounded-xl border-l-4 ${getPriorityColor(rec.priority)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-white font-medium mb-2">{rec.action}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">{rec.priority} Priority</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">{rec.timeline}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        rec.effort === 'Low' ? 'bg-green-400/20 text-green-400' :
                        rec.effort === 'Medium' ? 'bg-yellow-400/20 text-yellow-400' :
                        'bg-red-400/20 text-red-400'
                      }`}>
                        {rec.effort} Effort
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg text-sm font-medium hover:bg-green-500/30 transition-colors">
                    Implement
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h2 className="text-lg font-semibold text-white mb-4">Priority Matrix</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span className="text-red-400 font-medium">High Impact / Low Effort</span>
              </div>
              <p className="text-slate-300 text-sm">Quick Wins - Implement immediately</p>
              <ul className="mt-2 space-y-1">
                <li className="text-slate-400 text-sm">• Increase safety stock levels</li>
              </ul>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span className="text-yellow-400 font-medium">High Impact / High Effort</span>
              </div>
              <p className="text-slate-300 text-sm">Major Projects - Plan carefully</p>
              <ul className="mt-2 space-y-1">
                <li className="text-slate-400 text-sm">• Diversify supplier base</li>
                <li className="text-slate-400 text-sm">• Implement supplier scorecards</li>
              </ul>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-blue-400 font-medium">Low Impact / Low Effort</span>
              </div>
              <p className="text-slate-300 text-sm">Fill-ins - Do if time permits</p>
            </div>
            <div className="bg-slate-600/30 border border-slate-500/30 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 bg-slate-500 rounded-full" />
                <span className="text-slate-400 font-medium">Low Impact / High Effort</span>
              </div>
              <p className="text-slate-300 text-sm">Avoid - Not worth the effort</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-slate-700 text-white rounded-lg font-medium hover:bg-slate-600 transition-colors"
          >
            Back to Dashboard
          </button>
          <button className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default RCAScreen;
