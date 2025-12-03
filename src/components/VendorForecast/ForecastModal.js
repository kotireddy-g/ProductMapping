import React, { useState, useMemo } from 'react';
import { X, Download, Search, ChevronDown, ChevronUp, TrendingUp, Package, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { vendorForecastData, getVendorSummary, getStatusColor, getOtifColor } from '../../data/vendorForecastData';

const ForecastModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortField, setSortField] = useState('vendorName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);
  const itemsPerPage = 10;

  const summary = useMemo(() => getVendorSummary(), []);

  const categories = useMemo(() => {
    const cats = [...new Set(vendorForecastData.map(v => v.category))];
    return ['all', ...cats];
  }, []);

  const filteredData = useMemo(() => {
    let data = [...vendorForecastData];

    if (searchQuery) {
      data = data.filter(v => 
        v.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      data = data.filter(v => v.category === categoryFilter);
    }

    data.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return data;
  }, [searchQuery, categoryFilter, sortField, sortDirection]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleExpand = (id) => {
    setExpandedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  const getRowHighlight = (vendor) => {
    if (vendor.overstockPercent > 30 || vendor.understockPercent > 30) return 'bg-red-50';
    if (vendor.overstockPercent > 15 || vendor.understockPercent > 15) return 'bg-yellow-50';
    return '';
  };

  const formatCurrency = (value) => {
    if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
    if (value >= 1000) return `₹${(value / 1000).toFixed(0)}K`;
    return `₹${value}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-[95%] max-w-7xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Vendor Forecast Report</h2>
            <p className="text-sm text-slate-500">Supply vs Consumption Analysis - Next 30 Days</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </button>
            <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 p-6 bg-slate-50 border-b border-slate-200">
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Total Vendors</p>
                <p className="text-2xl font-bold text-slate-800">{summary.totalVendors}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Overstock Value</p>
                <p className="text-2xl font-bold text-orange-600">{formatCurrency(summary.overstockValue)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Understock Risk</p>
                <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.understockRisk)}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Avg OTIF</p>
                <p className="text-2xl font-bold text-green-600">{summary.avgOtif}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex items-center gap-4 border-b border-slate-200">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by vendor name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 sticky top-0">
              <tr className="border-b border-slate-200">
                {[
                  { key: 'vendorName', label: 'Vendor Name' },
                  { key: 'category', label: 'Category' },
                  { key: 'totalSKUs', label: 'SKUs' },
                  { key: 'availableStock', label: 'Available Stock' },
                  { key: 'expectedConsumption', label: 'Expected Consumption' },
                  { key: 'overstock', label: 'Overstock' },
                  { key: 'understock', label: 'Understock' },
                  { key: 'reorderPoint', label: 'Reorder Point' },
                  { key: 'leadTime', label: 'Lead Time' },
                  { key: 'otif', label: 'OTIF %' },
                  { key: 'nextDelivery', label: 'Next Delivery' },
                  { key: 'actions', label: 'Actions' }
                ].map((col) => (
                  <th
                    key={col.key}
                    onClick={() => col.key !== 'actions' && handleSort(col.key)}
                    className={`px-3 py-3 text-left text-xs font-semibold text-slate-600 ${
                      col.key !== 'actions' ? 'cursor-pointer hover:bg-slate-100' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {col.label}
                      {sortField === col.key && (
                        sortDirection === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((vendor) => {
                const statusColors = getStatusColor(vendor.status);
                const isExpanded = expandedRows.includes(vendor.id);
                
                return (
                  <React.Fragment key={vendor.id}>
                    <tr 
                      className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${getRowHighlight(vendor)}`}
                      onClick={() => toggleExpand(vendor.id)}
                    >
                      <td className="px-3 py-3 font-medium text-slate-800">{vendor.vendorName}</td>
                      <td className="px-3 py-3 text-slate-600">{vendor.category}</td>
                      <td className="px-3 py-3 text-slate-600">{vendor.totalSKUs}</td>
                      <td className="px-3 py-3">
                        <div className="flex items-center gap-2">
                          <span>{vendor.availableStock.toLocaleString()}</span>
                          <div className="w-16 h-6">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={vendor.trend.map((v, i) => ({ value: v }))}>
                                <Line type="monotone" dataKey="value" stroke="#64748b" strokeWidth={1} dot={false} />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-3 text-slate-600">{vendor.expectedConsumption.toLocaleString()}</td>
                      <td className="px-3 py-3">
                        {vendor.overstock > 0 ? (
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            vendor.overstockPercent > 30 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            +{vendor.overstock} ({vendor.overstockPercent}%)
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-3 py-3">
                        {vendor.understock > 0 ? (
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                            vendor.understockPercent > 30 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            -{vendor.understock} ({vendor.understockPercent}%)
                          </span>
                        ) : '-'}
                      </td>
                      <td className="px-3 py-3 text-slate-600">{vendor.reorderPoint.toLocaleString()}</td>
                      <td className="px-3 py-3 text-slate-600">{vendor.leadTime} days</td>
                      <td className="px-3 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getOtifColor(vendor.otif)}`}>
                          {vendor.otif}%
                        </span>
                      </td>
                      <td className="px-3 py-3 text-slate-600">
                        {new Date(vendor.nextDelivery).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1">
                          <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                            Order
                          </button>
                          <button className="px-2 py-1 border border-slate-300 text-slate-600 text-xs rounded hover:bg-slate-50">
                            Adjust
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isExpanded && (
                      <tr className="bg-slate-50">
                        <td colSpan={12} className="px-6 py-4">
                          <div className="text-sm text-slate-600">
                            <p className="font-medium mb-2">SKU Breakdown for {vendor.vendorName}</p>
                            <div className="grid grid-cols-4 gap-4">
                              <div>Avg Monthly Stock: {vendor.avgMonthlyStock.toLocaleString()} units</div>
                              <div>Status: <span className={`px-2 py-0.5 rounded ${statusColors.bg} ${statusColors.text}`}>{vendor.status}</span></div>
                              <div>Lead Time: {vendor.leadTime} days</div>
                              <div>Next Delivery: {vendor.nextDelivery}</div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
          <p className="text-sm text-slate-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} vendors
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50 hover:bg-slate-100"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded text-sm ${
                  currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-slate-300 hover:bg-slate-100'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-slate-300 rounded text-sm disabled:opacity-50 hover:bg-slate-100"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastModal;