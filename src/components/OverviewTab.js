import React, { useState } from 'react';
import { DollarSign, TrendingUp, Package, Clock, BarChart3, Info, X } from 'lucide-react';
import BipartiteChord from './BipartiteChord';
import { hierarchicalProductData } from '../data/hierarchicalData';

const OverviewTab = ({ products, verticalConfig, selectedVertical, searchQuery }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');
  const [showGuide, setShowGuide] = useState(false);

  const productData = products || {};
  
  const getCategoryStats = () => {
    let fast = 0, medium = 0, slow = 0, occasional = 0;
    let overConsumed = 0, expiryNear = 0, underConsumed = 0, deadStock = 0;
    
    Object.values(productData).forEach(dept => {
      dept.products.forEach(p => {
        if (p.category === 'fast') fast++;
        if (p.category === 'medium') medium++;
        if (p.category === 'slow') slow++;
        if (p.category === 'occasional') occasional++;
        
        if (p.status === 'over-consumed') overConsumed++;
        if (p.status === 'expiry-near') expiryNear++;
        if (p.status === 'under-consumed') underConsumed++;
        if (p.status === 'dead-stock') deadStock++;
      });
    });
    return { fast, medium, slow, occasional, overConsumed, expiryNear, underConsumed, deadStock };
  };

  const stats = getCategoryStats();

  const getTotalFinancials = () => {
    let totalCost = 0, totalRevenue = 0;
    Object.values(productData).forEach(dept => {
      dept.products.forEach(p => {
        totalCost += p.cost;
        totalRevenue += p.revenue;
      });
    });
    return { totalCost, totalRevenue, totalProfit: totalRevenue - totalCost };
  };

  const financials = getTotalFinancials();

  const hierarchicalData = hierarchicalProductData[selectedVertical] || hierarchicalProductData.hospitality;

  const InteractiveGuide = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showGuide ? '' : 'hidden'}`}>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl max-h-[85vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Understanding the Flow Chart</h2>
            <button
              onClick={() => setShowGuide(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">How to Read the Chart</h3>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p><strong>Left Side:</strong> Categories, Subcategories, Types, Brands, or Products (hierarchical)</p>
                <p><strong>Right Side:</strong> Areas, Hotels, Warehouses, or Locations where products are served</p>
                <p><strong>Ribbons:</strong> Show the flow/connection between products and areas</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Color Coding (Movement Speed)</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: '#22c55e'}}></div>
                    <span className="font-semibold">Fast Moving</span>
                  </div>
                  <p className="text-sm text-slate-600">High demand products with quick turnover</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: '#eab308'}}></div>
                    <span className="font-semibold">Medium</span>
                  </div>
                  <p className="text-sm text-slate-600">Moderate demand with steady turnover</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: '#f97316'}}></div>
                    <span className="font-semibold">Slow Moving</span>
                  </div>
                  <p className="text-sm text-slate-600">Low demand, slower turnover</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-4 h-4 rounded" style={{backgroundColor: '#ef4444'}}></div>
                    <span className="font-semibold">Occasional</span>
                  </div>
                  <p className="text-sm text-slate-600">Seasonal or event-based items</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Ribbon Width (Consumption Level)</h3>
              <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-4 bg-slate-400 rounded"></div>
                  <span className="font-medium">Over Consumption</span>
                  <span className="text-sm text-slate-500">Higher than expected usage</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-2 bg-slate-400 rounded"></div>
                  <span className="font-medium">Normal</span>
                  <span className="text-sm text-slate-500">Within expected range</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-6 h-1 bg-slate-400 rounded"></div>
                  <span className="font-medium">Under Consumption</span>
                  <span className="text-sm text-slate-500">Below expected usage</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Drill Down Navigation</h3>
              <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                <p><strong>Click any category</strong> on the left to see its subcategories</p>
                <p><strong>Continue clicking</strong> to drill down: Category → Subcategory → Type → Brand → Product</p>
                <p><strong>Use breadcrumbs</strong> at the top to navigate back</p>
                <p><strong>Hover over ribbons</strong> to see detailed flow information</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowGuide(false)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm font-medium">Total Cost</p>
              <p className="text-2xl font-bold text-blue-900">${(financials.totalCost / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 border border-emerald-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-700 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-emerald-900">${(financials.totalRevenue / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-10 h-10 bg-emerald-500 bg-opacity-20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-violet-50 to-violet-100 rounded-xl p-4 border border-violet-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-violet-700 text-sm font-medium">Total Products</p>
              <p className="text-2xl font-bold text-violet-900">{stats.fast + stats.medium + stats.slow + stats.occasional}</p>
            </div>
            <div className="w-10 h-10 bg-violet-500 bg-opacity-20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-violet-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 border border-amber-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-700 text-sm font-medium">Gross Margin</p>
              <p className="text-2xl font-bold text-amber-900">
                {((financials.totalProfit / financials.totalRevenue) * 100).toFixed(0)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-amber-500 bg-opacity-20 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-slate-800">Product Flow Analysis</h2>
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors"
          >
            <Info className="w-4 h-4" />
            How to use
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="flex items-center gap-3 px-4 py-2 bg-green-50 rounded-lg border border-green-200">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div>
            <p className="text-xs text-green-600 font-medium">Fast Moving</p>
            <p className="text-lg font-bold text-green-700">{stats.fast}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div>
            <p className="text-xs text-yellow-600 font-medium">Medium</p>
            <p className="text-lg font-bold text-yellow-700">{stats.medium}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
          <div>
            <p className="text-xs text-orange-600 font-medium">Slow Moving</p>
            <p className="text-lg font-bold text-orange-700">{stats.slow}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-red-50 rounded-lg border border-red-200">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div>
            <p className="text-xs text-red-600 font-medium">Occasional</p>
            <p className="text-lg font-bold text-red-700">{stats.occasional}</p>
          </div>
        </div>
      </div>

      <BipartiteChord 
        data={hierarchicalData}
        selectedVertical={selectedVertical}
      />

      <div className="grid grid-cols-4 gap-3 mt-4">
        <div className="flex items-center gap-3 px-4 py-2 bg-red-50 rounded-lg border border-red-200">
          <div className="w-2 h-8 rounded bg-red-500"></div>
          <div>
            <p className="text-xs text-red-600 font-medium">Over Consumed</p>
            <p className="text-lg font-bold text-red-700">{stats.overConsumed}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-orange-50 rounded-lg border border-orange-200">
          <div className="w-2 h-8 rounded bg-orange-500"></div>
          <div>
            <p className="text-xs text-orange-600 font-medium">Expiry Near</p>
            <p className="text-lg font-bold text-orange-700">{stats.expiryNear}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="w-2 h-8 rounded bg-yellow-500"></div>
          <div>
            <p className="text-xs text-yellow-600 font-medium">Under Consumed</p>
            <p className="text-lg font-bold text-yellow-700">{stats.underConsumed}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-100 rounded-lg border border-slate-200">
          <div className="w-2 h-8 rounded bg-slate-500"></div>
          <div>
            <p className="text-xs text-slate-600 font-medium">Dead Stock</p>
            <p className="text-lg font-bold text-slate-700">{stats.deadStock}</p>
          </div>
        </div>
      </div>

      <InteractiveGuide />
    </div>
  );
};

export default OverviewTab;
