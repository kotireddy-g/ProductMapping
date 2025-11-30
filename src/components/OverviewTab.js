import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DollarSign, TrendingUp, Package, AlertCircle, Zap, Clock, TrendingDown, Flame, Droplet, BarChart3 } from 'lucide-react';

const OverviewTab = () => {
  const svgRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBusinessMetric, setSelectedBusinessMetric] = useState(null);

  // Comprehensive product data with business impact metrics
  const productData = {
    'Kitchen': {
      products: [
        { name: 'Fresh Vegetables', category: 'fast', flow: 45, cost: 5000, revenue: 15000, margin: 67, status: 'normal', expiryDays: 3, consumption: 'normal' },
        { name: 'Meat & Poultry', category: 'fast', flow: 38, cost: 12000, revenue: 35000, margin: 66, status: 'over-consumed', expiryDays: 2, consumption: 'high' },
        { name: 'Dairy Products', category: 'fast', flow: 42, cost: 3000, revenue: 9000, margin: 67, status: 'expiry-near', expiryDays: 1, consumption: 'normal' },
        { name: 'Seafood', category: 'medium', flow: 15, cost: 8000, revenue: 22000, margin: 64, status: 'normal', expiryDays: 1, consumption: 'normal' },
        { name: 'Spices & Herbs', category: 'slow', flow: 8, cost: 500, revenue: 1500, margin: 67, status: 'under-consumed', expiryDays: 180, consumption: 'low' },
        { name: 'Specialty Oils', category: 'occasional', flow: 3, cost: 800, revenue: 2400, margin: 67, status: 'dead-stock', expiryDays: 90, consumption: 'minimal' }
      ]
    },
    'Bar': {
      products: [
        { name: 'Beer & Wine', category: 'fast', flow: 50, cost: 8000, revenue: 28000, margin: 71, status: 'normal', expiryDays: 365, consumption: 'high' },
        { name: 'Spirits', category: 'fast', flow: 35, cost: 15000, revenue: 55000, margin: 73, status: 'normal', expiryDays: 365, consumption: 'high' },
        { name: 'Mixers & Sodas', category: 'fast', flow: 40, cost: 2000, revenue: 8000, margin: 75, status: 'over-consumed', expiryDays: 180, consumption: 'high' },
        { name: 'Garnishes', category: 'medium', flow: 12, cost: 600, revenue: 2400, margin: 75, status: 'expiry-near', expiryDays: 2, consumption: 'normal' },
        { name: 'Specialty Liqueurs', category: 'slow', flow: 7, cost: 3000, revenue: 12000, margin: 75, status: 'under-consumed', expiryDays: 365, consumption: 'low' },
        { name: 'Craft Cocktail Ingredients', category: 'occasional', flow: 4, cost: 1200, revenue: 5000, margin: 76, status: 'dead-stock', expiryDays: 120, consumption: 'minimal' }
      ]
    },
    'Restaurant': {
      products: [
        { name: 'Table Linens', category: 'fast', flow: 30, cost: 2000, revenue: 0, margin: 0, status: 'normal', expiryDays: 365, consumption: 'normal' },
        { name: 'Disposables', category: 'fast', flow: 45, cost: 1500, revenue: 0, margin: 0, status: 'over-consumed', expiryDays: 365, consumption: 'high' },
        { name: 'Condiments', category: 'medium', flow: 18, cost: 800, revenue: 0, margin: 0, status: 'normal', expiryDays: 60, consumption: 'normal' },
        { name: 'Serving Ware', category: 'slow', flow: 5, cost: 3000, revenue: 0, margin: 0, status: 'under-consumed', expiryDays: 365, consumption: 'low' },
        { name: 'Decorative Items', category: 'occasional', flow: 2, cost: 1000, revenue: 0, margin: 0, status: 'dead-stock', expiryDays: 365, consumption: 'minimal' }
      ]
    },
    'Room Service': {
      products: [
        { name: 'Breakfast Items', category: 'fast', flow: 35, cost: 4000, revenue: 14000, margin: 71, status: 'normal', expiryDays: 3, consumption: 'normal' },
        { name: 'Minibar Stock', category: 'fast', flow: 28, cost: 3000, revenue: 12000, margin: 75, status: 'expiry-near', expiryDays: 5, consumption: 'normal' },
        { name: 'Amenities', category: 'medium', flow: 20, cost: 2500, revenue: 0, margin: 0, status: 'normal', expiryDays: 365, consumption: 'normal' },
        { name: 'Special Requests', category: 'slow', flow: 8, cost: 1200, revenue: 5000, margin: 76, status: 'under-consumed', expiryDays: 90, consumption: 'low' },
        { name: 'VIP Packages', category: 'occasional', flow: 3, cost: 2000, revenue: 10000, margin: 80, status: 'dead-stock', expiryDays: 365, consumption: 'minimal' }
      ]
    },
    'Banquet': {
      products: [
        { name: 'Buffet Supplies', category: 'fast', flow: 25, cost: 5000, revenue: 20000, margin: 75, status: 'normal', expiryDays: 7, consumption: 'normal' },
        { name: 'Event Beverages', category: 'fast', flow: 30, cost: 4000, revenue: 16000, margin: 75, status: 'normal', expiryDays: 365, consumption: 'normal' },
        { name: 'Decoration Materials', category: 'medium', flow: 10, cost: 3000, revenue: 12000, margin: 75, status: 'normal', expiryDays: 365, consumption: 'normal' },
        { name: 'Audio-Visual Equipment', category: 'slow', flow: 5, cost: 8000, revenue: 0, margin: 0, status: 'under-consumed', expiryDays: 365, consumption: 'low' },
        { name: 'Themed Event Items', category: 'occasional', flow: 3, cost: 2000, revenue: 8000, margin: 75, status: 'dead-stock', expiryDays: 180, consumption: 'minimal' }
      ]
    },
    'Storage': {
      products: [
        { name: 'Dry Goods', category: 'fast', flow: 40, cost: 6000, revenue: 0, margin: 0, status: 'normal', expiryDays: 180, consumption: 'normal' },
        { name: 'Frozen Items', category: 'fast', flow: 35, cost: 7000, revenue: 0, margin: 0, status: 'over-consumed', expiryDays: 30, consumption: 'high' },
        { name: 'Cleaning Supplies', category: 'medium', flow: 15, cost: 2000, revenue: 0, margin: 0, status: 'normal', expiryDays: 365, consumption: 'normal' },
        { name: 'Seasonal Stock', category: 'slow', flow: 6, cost: 4000, revenue: 0, margin: 0, status: 'under-consumed', expiryDays: 120, consumption: 'low' },
        { name: 'Emergency Reserves', category: 'occasional', flow: 2, cost: 3000, revenue: 0, margin: 0, status: 'dead-stock', expiryDays: 365, consumption: 'minimal' }
      ]
    }
  };

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

  const filterProductsByCategory = (category) => {
    if (category === 'all') return productData;
    
    const filtered = {};
    Object.entries(productData).forEach(([dept, data]) => {
      filtered[dept] = {
        products: data.products.filter(p => p.category === category)
      };
    });
    return filtered;
  };

  const getProductsByMetric = (metric) => {
    const products = [];
    Object.entries(productData).forEach(([dept, data]) => {
      data.products.forEach(p => {
        if (p.status === metric) {
          products.push({ ...p, department: dept });
        }
      });
    });
    return products;
  };

  useEffect(() => {
    const currentData = filterProductsByCategory(selectedCategory);
    
    // Calculate flow matrix from filtered products
    const departments = ['Kitchen', 'Bar', 'Restaurant', 'Room Service', 'Banquet', 'Storage'];
    const matrix = departments.map((dept, i) => {
      return departments.map((targetDept, j) => {
        if (i === j) return 0;
        const products = currentData[dept]?.products || [];
        const totalFlow = products.reduce((sum, p) => sum + p.flow, 0);
        // Distribute flow to other departments based on synthetic distribution
        return totalFlow * (0.1 + Math.random() * 0.3);
      });
    });

    const width = 900;
    const height = 900;
    const outerRadius = Math.min(width, height) * 0.5 - 120;
    const innerRadius = outerRadius - 25;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('style', 'max-width: 100%; height: auto; font: 11px sans-serif;');

    const chord = d3.chordDirected()
      .padAngle(0.05)
      .sortSubgroups(d3.descending);

    const arc = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius);

    const ribbon = d3.ribbonArrow()
      .radius(innerRadius - 1)
      .padAngle(1 / innerRadius);

    const chords = chord(matrix);

    const colors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#34495e'];
    const color = d3.scaleOrdinal().domain(d3.range(6)).range(colors);

    // Add groups (arcs)
    const group = svg.append('g')
      .selectAll('g')
      .data(chords.groups)
      .join('g');

    group.append('path')
      .attr('fill', d => color(d.index))
      .attr('d', arc)
      .attr('opacity', 0.85)
      .style('cursor', 'pointer')
      .on('click', function(event, d) {
        const deptName = departments[d.index];
        setSelectedItem({
          type: 'department',
          name: deptName,
          data: currentData[deptName]
        });
        setSelectedBusinessMetric(null);
      })
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 1).attr('stroke', '#fff').attr('stroke-width', 3);
        svg.selectAll('.ribbon')
          .attr('opacity', r => 
            r.source.index === d.index || r.target.index === d.index ? 0.8 : 0.1
          );
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 0.85).attr('stroke', 'none');
        svg.selectAll('.ribbon').attr('opacity', 0.65);
      });

    group.append('text')
      .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr('dy', '0.35em')
      .attr('transform', d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${outerRadius + 30})
        ${d.angle > Math.PI ? 'rotate(180)' : ''}
      `)
      .attr('text-anchor', d => d.angle > Math.PI ? 'end' : 'start')
      .text(d => departments[d.index])
      .attr('fill', d => color(d.index))
      .attr('font-weight', 'bold')
      .attr('font-size', '13px')
      .style('cursor', 'pointer')
      .on('click', function(event, d) {
        const deptName = departments[d.index];
        setSelectedItem({
          type: 'department',
          name: deptName,
          data: currentData[deptName]
        });
        setSelectedBusinessMetric(null);
      });

    // Add ribbons
    svg.append('g')
      .attr('fill-opacity', 0.65)
      .selectAll('path')
      .data(chords)
      .join('path')
      .attr('class', 'ribbon')
      .attr('d', ribbon)
      .attr('fill', d => color(d.source.index))
      .attr('stroke', d => d3.rgb(color(d.source.index)).darker())
      .attr('stroke-width', 0.5)
      .style('cursor', 'pointer')
      .on('click', function(event, d) {
        setSelectedItem({
          type: 'flow',
          from: departments[d.source.index],
          to: departments[d.target.index],
          value: Math.round(d.source.value),
          sourceData: currentData[departments[d.source.index]],
          targetData: currentData[departments[d.target.index]]
        });
        setSelectedBusinessMetric(null);
      })
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('fill-opacity', 0.95)
          .attr('stroke-width', 2);
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('fill-opacity', 0.65)
          .attr('stroke-width', 0.5);
      });

  }, [selectedCategory, filterProductsByCategory]);

  const getTotalFinancials = () => {
    const currentData = filterProductsByCategory(selectedCategory);
    let totalCost = 0, totalRevenue = 0;
    Object.values(currentData).forEach(dept => {
      dept.products.forEach(p => {
        totalCost += p.cost;
        totalRevenue += p.revenue;
      });
    });
    return { totalCost, totalRevenue, totalProfit: totalRevenue - totalCost };
  };

  const financials = getTotalFinancials();

  return (
    <div className="space-y-6">
      {/* Key Metrics - Financial Overview */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 text-sm font-semibold">Total Cost</p>
              <p className="text-2xl font-bold text-blue-900">${(financials.totalCost / 1000).toFixed(0)}K</p>
            </div>
            <DollarSign className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-700 text-sm font-semibold">Total Revenue</p>
              <p className="text-2xl font-bold text-green-900">${(financials.totalRevenue / 1000).toFixed(0)}K</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-700 text-sm font-semibold">Net Profit</p>
              <p className="text-2xl font-bold text-purple-900">${(financials.totalProfit / 1000).toFixed(0)}K</p>
            </div>
            <Package className="w-8 h-8 text-purple-400" />
          </div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-700 text-sm font-semibold">Profit Margin</p>
              <p className="text-2xl font-bold text-orange-900">
                {financials.totalRevenue ? ((financials.totalProfit / financials.totalRevenue) * 100).toFixed(1) : 0}%
              </p>
            </div>
            <BarChart3 className="w-8 h-8 text-orange-400" />
          </div>
        </div>
      </div>

      {/* Main Chart Section */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-900">Product Flow Network</h2>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Chart - 2/3 width */}
          <div className="col-span-2">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4">
              <svg ref={svgRef} style={{ minHeight: '600px' }}></svg>
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">
              Click on departments or flows to view detailed analytics
            </p>
          </div>

          {/* Right Drawer - Selected Item Details */}
          <div className="space-y-4 max-h-[700px] overflow-y-auto">
            {selectedItem ? (
              <>
                {selectedItem.type === 'department' && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 sticky top-0">
                    <h3 className="font-bold text-slate-900 mb-3">{selectedItem.name} - Summary</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>Products:</strong> {selectedItem.data.products.length}</p>
                      <p><strong>Total Flow:</strong> {selectedItem.data.products.reduce((sum, p) => sum + p.flow, 0)} units/day</p>
                      <p><strong>Total Cost:</strong> ${selectedItem.data.products.reduce((sum, p) => sum + p.cost, 0).toLocaleString()}</p>
                      <p><strong>Total Revenue:</strong> ${selectedItem.data.products.reduce((sum, p) => sum + p.revenue, 0).toLocaleString()}</p>
                    </div>
                  </div>
                )}
                
                {selectedItem.type === 'flow' && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 sticky top-0">
                    <h3 className="font-bold text-slate-900 mb-3">Flow Details</h3>
                    <div className="space-y-2 text-sm">
                      <p><strong>From:</strong> {selectedItem.from}</p>
                      <p><strong>To:</strong> {selectedItem.to}</p>
                      <p><strong>Units:</strong> {selectedItem.value}</p>
                    </div>
                  </div>
                )}

                {selectedItem.type === 'department' && (
                  <div className="space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm">Products</h4>
                    {selectedItem.data.products.map((product, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border-l-4 border-blue-500 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-bold text-slate-800 text-sm">{product.name}</h5>
                            <div className="flex gap-1 mt-1 flex-wrap">
                              <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium ${
                                product.category === 'fast' ? 'bg-green-100 text-green-800' :
                                product.category === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                product.category === 'slow' ? 'bg-orange-100 text-orange-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {product.category === 'fast' ? '⚡ FAST' :
                                 product.category === 'medium' ? '📊 MEDIUM' :
                                 product.category === 'slow' ? '🐢 SLOW' :
                                 '🔴 OCCASIONAL'}
                              </span>
                              <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium ${
                                product.status === 'over-consumed' ? 'bg-red-100 text-red-800' :
                                product.status === 'expiry-near' ? 'bg-orange-100 text-orange-800' :
                                product.status === 'under-consumed' ? 'bg-yellow-100 text-yellow-800' :
                                product.status === 'dead-stock' ? 'bg-red-100 text-red-800' :
                                'bg-green-100 text-green-800'
                              }`}>
                                {product.status === 'over-consumed' ? '⚠️ Over-Consumed' :
                                 product.status === 'expiry-near' ? '🔥 Expiry Near' :
                                 product.status === 'under-consumed' ? '📉 Under-Consumed' :
                                 product.status === 'dead-stock' ? '💀 Dead Stock' :
                                 '✓ Normal'}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-blue-600">{product.flow}</p>
                            <p className="text-xs text-slate-500">units/day</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t text-xs">
                          <div>
                            <p className="text-slate-500">Cost</p>
                            <p className="font-bold text-red-600">${product.cost.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Revenue</p>
                            <p className="font-bold text-green-600">${product.revenue.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Margin</p>
                            <p className="font-bold text-purple-600">{product.margin}%</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Expiry</p>
                            <p className="font-bold text-slate-700">{product.expiryDays}d</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : selectedBusinessMetric ? (
              <>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 sticky top-0">
                  <h3 className="font-bold text-slate-900 mb-3">{selectedBusinessMetric.label}</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Total Products:</strong> {selectedBusinessMetric.count}</p>
                    <p><strong>Description:</strong> {selectedBusinessMetric.description}</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Affected Products</h4>
                  {selectedBusinessMetric.products.map((product, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 border-l-4 border-blue-500 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-bold text-slate-800 text-sm">{product.name}</h5>
                          <p className="text-xs text-slate-600 mt-1">Department: {product.department}</p>
                          <div className="flex gap-1 mt-1">
                            <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium ${
                              product.category === 'fast' ? 'bg-green-100 text-green-800' :
                              product.category === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              product.category === 'slow' ? 'bg-orange-100 text-orange-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {product.category === 'fast' ? '⚡ FAST' :
                               product.category === 'medium' ? '📊 MEDIUM' :
                               product.category === 'slow' ? '🐢 SLOW' :
                               '🔴 OCCASIONAL'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-blue-600">{product.flow}</p>
                          <p className="text-xs text-slate-500">units/day</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-2 pt-2 border-t text-xs">
                        <div>
                          <p className="text-slate-500">Cost</p>
                          <p className="font-bold text-red-600">${product.cost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Revenue</p>
                          <p className="font-bold text-green-600">${product.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Margin</p>
                          <p className="font-bold text-purple-600">{product.margin}%</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Expiry</p>
                          <p className="font-bold text-slate-700">{product.expiryDays}d</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                <p className="text-sm text-slate-600">Click on any department, flow, or business metric to see details here</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filters at Bottom */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4">Product Movement Filters</h3>
        <div className="grid grid-cols-8 gap-2">
          {/* Movement Speed Filters */}
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedItem(null); setSelectedBusinessMetric(null); }}
            className={`p-3 rounded-lg text-center transition-all text-sm font-medium ${
              selectedCategory === 'all' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <div className="text-lg mb-1">📦</div>
            <div>All</div>
            <div className="text-xs mt-1">{stats.fast + stats.medium + stats.slow + stats.occasional}</div>
          </button>
          
          <button
            onClick={() => { setSelectedCategory('fast'); setSelectedItem(null); setSelectedBusinessMetric(null); }}
            className={`p-3 rounded-lg text-center transition-all text-sm font-medium ${
              selectedCategory === 'fast' 
                ? 'bg-green-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <div className="text-lg mb-1">⚡</div>
            <div>Fast</div>
            <div className="text-xs mt-1">{stats.fast}</div>
          </button>

          <button
            onClick={() => { setSelectedCategory('medium'); setSelectedItem(null); setSelectedBusinessMetric(null); }}
            className={`p-3 rounded-lg text-center transition-all text-sm font-medium ${
              selectedCategory === 'medium' 
                ? 'bg-yellow-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <div className="text-lg mb-1">📊</div>
            <div>Medium</div>
            <div className="text-xs mt-1">{stats.medium}</div>
          </button>

          <button
            onClick={() => { setSelectedCategory('slow'); setSelectedItem(null); setSelectedBusinessMetric(null); }}
            className={`p-3 rounded-lg text-center transition-all text-sm font-medium ${
              selectedCategory === 'slow' 
                ? 'bg-orange-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <div className="text-lg mb-1">🐢</div>
            <div>Slow</div>
            <div className="text-xs mt-1">{stats.slow}</div>
          </button>

          <button
            onClick={() => { setSelectedCategory('occasional'); setSelectedItem(null); setSelectedBusinessMetric(null); }}
            className={`p-3 rounded-lg text-center transition-all text-sm font-medium ${
              selectedCategory === 'occasional' 
                ? 'bg-red-600 text-white shadow-md' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <div className="text-lg mb-1">🔴</div>
            <div>Occasional</div>
            <div className="text-xs mt-1">{stats.occasional}</div>
          </button>

          {/* Business Impact Filters */}
          <button
            onClick={() => {
              setSelectedItem(null);
              setSelectedBusinessMetric({
                metric: 'over-consumed',
                label: 'Over-Consumed Products',
                description: 'Products being used faster than expected',
                count: stats.overConsumed,
                products: getProductsByMetric('over-consumed')
              });
            }}
            className={`p-3 rounded-lg text-center transition-all text-sm font-medium ${
              selectedBusinessMetric?.metric === 'over-consumed'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-red-50 border border-red-200 text-red-700 hover:bg-red-100'
            }`}
          >
            <div className="text-lg mb-1">⚠️</div>
            <div>Over-Consumed</div>
            <div className="text-xs mt-1">{stats.overConsumed}</div>
          </button>

          <button
            onClick={() => {
              setSelectedItem(null);
              setSelectedBusinessMetric({
                metric: 'expiry-near',
                label: 'Expiry Near Products',
                description: 'Products expiring within 1-7 days',
                count: stats.expiryNear,
                products: getProductsByMetric('expiry-near')
              });
            }}
            className={`p-3 rounded-lg text-center transition-all text-sm font-medium ${
              selectedBusinessMetric?.metric === 'expiry-near'
                ? 'bg-orange-600 text-white shadow-md'
                : 'bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100'
            }`}
          >
            <div className="text-lg mb-1">🔥</div>
            <div>Expiry Near</div>
            <div className="text-xs mt-1">{stats.expiryNear}</div>
          </button>

          <button
            onClick={() => {
              setSelectedItem(null);
              setSelectedBusinessMetric({
                metric: 'under-consumed',
                label: 'Under-Consumed Products',
                description: 'Products with low demand',
                count: stats.underConsumed,
                products: getProductsByMetric('under-consumed')
              });
            }}
            className={`p-3 rounded-lg text-center transition-all text-sm font-medium ${
              selectedBusinessMetric?.metric === 'under-consumed'
                ? 'bg-yellow-600 text-white shadow-md'
                : 'bg-yellow-50 border border-yellow-200 text-yellow-700 hover:bg-yellow-100'
            }`}
          >
            <div className="text-lg mb-1">📉</div>
            <div>Under-Consumed</div>
            <div className="text-xs mt-1">{stats.underConsumed}</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
