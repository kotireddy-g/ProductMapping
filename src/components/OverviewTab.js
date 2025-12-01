import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { DollarSign, TrendingUp, Package, AlertCircle, Zap, Clock, TrendingDown, Flame, Droplet, BarChart3, Info, Search, X, Calendar, BarChart, TrendingUp as TrendUp } from 'lucide-react';

const OverviewTab = () => {
  const svgRef = useRef();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedBusinessMetric, setSelectedBusinessMetric] = useState(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState('daily');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [productSearchQuery, setProductSearchQuery] = useState('');

  // Enhanced product data with cross-location tracking and timeframe-based metrics
  const productData = {
    'Kitchen': {
      products: [
        { 
          name: 'Fresh Fish', category: 'fast', flow: 45, cost: 5000, revenue: 15000, margin: 67, status: 'normal', expiryDays: 3, consumption: 'normal',
          locations: { 'Downtown Hotel': { status: 'normal', flow: 25 }, 'Beach Resort': { status: 'over-consumed', flow: 35 }, 'Airport Restaurant': { status: 'normal', flow: 20 } },
          timeframes: { hourly: 2, daily: 45, weekly: 315, monthly: 1350, quarterly: 4050, yearly: 16425 }
        },
        { 
          name: 'Premium Beef', category: 'fast', flow: 38, cost: 12000, revenue: 35000, margin: 66, status: 'over-consumed', expiryDays: 2, consumption: 'high',
          locations: { 'Fine Dining': { status: 'over-consumed', flow: 45 }, 'Downtown Hotel': { status: 'normal', flow: 30 }, 'Suburban Hotel': { status: 'under-consumed', flow: 15 } },
          timeframes: { hourly: 1.6, daily: 38, weekly: 266, monthly: 1140, quarterly: 3420, yearly: 13870 }
        },
        { 
          name: 'Organic Vegetables', category: 'fast', flow: 42, cost: 3000, revenue: 9000, margin: 67, status: 'expiry-near', expiryDays: 1, consumption: 'normal',
          locations: { 'City Center Cafe': { status: 'expiry-near', flow: 50 }, 'Beach Resort': { status: 'normal', flow: 35 }, 'Fast Casual': { status: 'normal', flow: 40 } },
          timeframes: { hourly: 1.8, daily: 42, weekly: 294, monthly: 1260, quarterly: 3780, yearly: 15330 }
        },
        { 
          name: 'Imported Seafood', category: 'medium', flow: 15, cost: 8000, revenue: 22000, margin: 64, status: 'normal', expiryDays: 1, consumption: 'normal',
          locations: { 'Fine Dining': { status: 'normal', flow: 20 }, 'Rooftop Bar': { status: 'under-consumed', flow: 10 }, 'Downtown Hotel': { status: 'normal', flow: 15 } },
          timeframes: { hourly: 0.6, daily: 15, weekly: 105, monthly: 450, quarterly: 1350, yearly: 5475 }
        },
        { 
          name: 'Artisan Spices', category: 'slow', flow: 8, cost: 500, revenue: 1500, margin: 67, status: 'under-consumed', expiryDays: 180, consumption: 'low',
          locations: { 'Fine Dining': { status: 'normal', flow: 12 }, 'Downtown Hotel': { status: 'under-consumed', flow: 5 }, 'Beach Resort': { status: 'dead-stock', flow: 2 } },
          timeframes: { hourly: 0.3, daily: 8, weekly: 56, monthly: 240, quarterly: 720, yearly: 2920 }
        },
        { 
          name: 'Truffle Oil', category: 'occasional', flow: 3, cost: 800, revenue: 2400, margin: 67, status: 'dead-stock', expiryDays: 90, consumption: 'minimal',
          locations: { 'Fine Dining': { status: 'occasional', flow: 5 }, 'Downtown Hotel': { status: 'dead-stock', flow: 1 }, 'Rooftop Bar': { status: 'dead-stock', flow: 1 } },
          timeframes: { hourly: 0.1, daily: 3, weekly: 21, monthly: 90, quarterly: 270, yearly: 1095 }
        }
      ]
    },
    'Bar': {
      products: [
        { 
          name: 'Premium Wine', category: 'fast', flow: 50, cost: 8000, revenue: 28000, margin: 71, status: 'normal', expiryDays: 365, consumption: 'high',
          locations: { 'Rooftop Bar': { status: 'normal', flow: 60 }, 'Fine Dining': { status: 'over-consumed', flow: 75 }, 'Downtown Hotel': { status: 'normal', flow: 45 } },
          timeframes: { hourly: 2.1, daily: 50, weekly: 350, monthly: 1500, quarterly: 4500, yearly: 18250 }
        },
        { 
          name: 'Craft Spirits', category: 'fast', flow: 35, cost: 15000, revenue: 55000, margin: 73, status: 'normal', expiryDays: 365, consumption: 'high',
          locations: { 'Rooftop Bar': { status: 'over-consumed', flow: 50 }, 'Fine Dining': { status: 'normal', flow: 35 }, 'Beach Resort': { status: 'under-consumed', flow: 20 } },
          timeframes: { hourly: 1.5, daily: 35, weekly: 245, monthly: 1050, quarterly: 3150, yearly: 12775 }
        },
        { 
          name: 'Fresh Garnishes', category: 'medium', flow: 12, cost: 600, revenue: 2400, margin: 75, status: 'expiry-near', expiryDays: 2, consumption: 'normal',
          locations: { 'Rooftop Bar': { status: 'expiry-near', flow: 15 }, 'Fine Dining': { status: 'normal', flow: 12 }, 'Downtown Hotel': { status: 'under-consumed', flow: 8 } },
          timeframes: { hourly: 0.5, daily: 12, weekly: 84, monthly: 360, quarterly: 1080, yearly: 4380 }
        }
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

  // Get all unique products across departments
  const getAllProducts = () => {
    const products = [];
    Object.entries(productData).forEach(([dept, data]) => {
      data.products.forEach(p => {
        products.push({ ...p, department: dept });
      });
    });
    return products;
  };

  // Filter products by search query
  const getFilteredProducts = () => {
    const allProducts = getAllProducts();
    if (!productSearchQuery) return allProducts;
    return allProducts.filter(p => 
      p.name.toLowerCase().includes(productSearchQuery.toLowerCase())
    );
  };

  // Get timeframe-adjusted data
  const getTimeframeAdjustedData = (data) => {
    const adjusted = {};
    Object.entries(data).forEach(([dept, deptData]) => {
      adjusted[dept] = {
        products: deptData.products.map(p => ({
          ...p,
          flow: p.timeframes ? p.timeframes[selectedTimeframe] || p.flow : p.flow
        }))
      };
    });
    return adjusted;
  };

  // Get product cross-location data
  const getProductCrossLocationData = (productName) => {
    const crossLocationData = [];
    Object.entries(productData).forEach(([dept, data]) => {
      const product = data.products.find(p => p.name === productName);
      if (product && product.locations) {
        Object.entries(product.locations).forEach(([location, locationData]) => {
          crossLocationData.push({
            ...product,
            department: dept,
            location: location,
            locationStatus: locationData.status,
            locationFlow: locationData.flow
          });
        });
      }
    });
    return crossLocationData;
  };

  // Get departments that have the selected product
  const getProductDepartments = (productName) => {
    const departments = [];
    Object.entries(productData).forEach(([dept, data]) => {
      const product = data.products.find(p => p.name === productName);
      if (product) {
        departments.push(dept);
      }
    });
    return departments;
  };

  // Get critical insights for default panel
  const getCriticalInsights = () => {
    const insights = [];
    Object.entries(productData).forEach(([dept, data]) => {
      data.products.forEach(product => {
        // Critical conditions requiring immediate attention
        if (product.status === 'expiry-near' || product.status === 'over-consumed' || product.status === 'dead-stock') {
          insights.push({
            ...product,
            department: dept,
            priority: product.status === 'expiry-near' ? 'critical' : 
                     product.status === 'over-consumed' ? 'high' : 'medium'
          });
        }
      });
    });
    
    // Sort by priority: critical first, then high, then medium
    return insights.sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  // Get flow breakdown between two departments
  const getFlowBreakdown = (sourceDept, targetDept) => {
    const sourceProducts = productData[sourceDept]?.products || [];
    const targetProducts = productData[targetDept]?.products || [];
    
    // Calculate which products flow from source to target
    const flowBreakdown = sourceProducts.map(product => {
      // Simulate flow distribution based on product characteristics
      const flowPercentage = product.category === 'fast' ? 0.4 : 
                            product.category === 'medium' ? 0.25 : 
                            product.category === 'slow' ? 0.15 : 0.1;
      
      const flowAmount = Math.round(product.flow * flowPercentage);
      
      return {
        ...product,
        flowAmount,
        sourceDept,
        targetDept,
        flowPercentage: Math.round(flowPercentage * 100)
      };
    }).filter(p => p.flowAmount > 0);
    
    return flowBreakdown.sort((a, b) => b.flowAmount - a.flowAmount);
  };

  // Highlight product-specific elements in chord diagram
  const highlightProductInChart = (productName) => {
    const svg = d3.select(svgRef.current);
    const productDepartments = getProductDepartments(productName);
    const departmentNames = ['Kitchen', 'Bar', 'Restaurant', 'Room Service', 'Banquet', 'Storage'];
    
    if (productName && productDepartments.length > 0) {
      // Dim all elements first
      svg.selectAll('.department-arc').attr('opacity', 0.2);
      svg.selectAll('.department-text').attr('opacity', 0.3);
      svg.selectAll('.ribbon').attr('opacity', 0.1);
      
      // Highlight departments that have this product
      productDepartments.forEach(dept => {
        const deptIndex = departmentNames.indexOf(dept);
        if (deptIndex !== -1) {
          svg.selectAll('.department-arc').filter((d, i) => i === deptIndex)
            .attr('opacity', 1)
            .attr('stroke', '#ff6b6b')
            .attr('stroke-width', 3);
          
          svg.selectAll('.department-text').filter((d, i) => i === deptIndex)
            .attr('opacity', 1)
            .attr('fill', '#ff6b6b')
            .attr('font-weight', 'bold');
        }
      });
      
      // Highlight ribbons between departments that have this product
      svg.selectAll('.ribbon').filter(d => {
        const sourceDept = departmentNames[d.source.index];
        const targetDept = departmentNames[d.target.index];
        return productDepartments.includes(sourceDept) && productDepartments.includes(targetDept);
      }).attr('opacity', 0.8)
        .attr('stroke', '#ff6b6b')
        .attr('stroke-width', 2);
        
    } else {
      // Reset all elements to normal
      svg.selectAll('.department-arc')
        .attr('opacity', 0.85)
        .attr('stroke', 'none');
      svg.selectAll('.department-text')
        .attr('opacity', 1)
        .attr('fill', (d, i) => d3.schemeCategory10[i])
        .attr('font-weight', 'bold');
      svg.selectAll('.ribbon')
        .attr('opacity', 0.65)
        .attr('stroke-width', 0.5);
    }
  };

  useEffect(() => {
    const baseData = filterProductsByCategory(selectedCategory);
    const currentData = getTimeframeAdjustedData(baseData);
    
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
      .datum(d => d)
      .attr('class', 'department-arc')
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
        setSelectedProduct(null);
        setSelectedBusinessMetric(null);
      })
      .on('mouseover', function(event, d) {
        const deptName = departments[d.index];
        const deptData = currentData[deptName];
        const totalFlow = deptData.products.reduce((sum, p) => sum + p.flow, 0);
        const totalCost = deptData.products.reduce((sum, p) => sum + p.cost, 0);
        const totalRevenue = deptData.products.reduce((sum, p) => sum + p.revenue, 0);
        
        d3.select(this).attr('opacity', 1).attr('stroke', '#333').attr('stroke-width', 2);
        svg.selectAll('.ribbon')
          .attr('opacity', r => 
            r.source.index === d.index || r.target.index === d.index ? 0.8 : 0.1
          );
          
        // Create tooltip
        const tooltip = d3.select('body').append('div')
          .attr('class', 'chord-tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.9)')
          .style('color', 'white')
          .style('padding', '12px')
          .style('border-radius', '8px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')
          .style('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.3)')
          .html(`
            <div style="font-weight: bold; margin-bottom: 8px; color: ${color(d.index)}">${deptName} Department</div>
            <div>Products: ${deptData.products.length}</div>
            <div>Total Flow: ${totalFlow} units/${selectedTimeframe.slice(0, -2)}</div>
            <div>Total Cost: $${totalCost.toLocaleString()}</div>
            <div>Total Revenue: $${totalRevenue.toLocaleString()}</div>
            <div style="margin-top: 6px; font-size: 10px; opacity: 0.8">Click to view details</div>
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).attr('opacity', 0.85).attr('stroke', 'none');
        svg.selectAll('.ribbon').attr('opacity', 0.65);
        d3.selectAll('.chord-tooltip').remove();
      });

    group.append('text')
      .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr('class', 'department-text')
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
        setSelectedProduct(null);
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
        const sourceDept = departments[d.source.index];
        const targetDept = departments[d.target.index];
        const flowValue = Math.round(d.source.value);
        
        d3.select(this)
          .attr('fill-opacity', 0.95)
          .attr('stroke-width', 2);
          
        // Create tooltip for flow
        const tooltip = d3.select('body').append('div')
          .attr('class', 'chord-tooltip')
          .style('position', 'absolute')
          .style('background', 'rgba(0, 0, 0, 0.9)')
          .style('color', 'white')
          .style('padding', '12px')
          .style('border-radius', '8px')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')
          .style('box-shadow', '0 4px 12px rgba(0, 0, 0, 0.3)')
          .html(`
            <div style="font-weight: bold; margin-bottom: 8px; color: ${color(d.source.index)}">Product Flow</div>
            <div><strong>From:</strong> ${sourceDept}</div>
            <div><strong>To:</strong> ${targetDept}</div>
            <div><strong>Volume:</strong> ${flowValue} units/${selectedTimeframe.slice(0, -2)}</div>
            <div style="margin-top: 6px; font-size: 10px; opacity: 0.8">Click to see product breakdown</div>
          `)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 10) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('fill-opacity', 0.65)
          .attr('stroke-width', 0.5);
        d3.selectAll('.chord-tooltip').remove();
      });

  }, [selectedCategory, selectedTimeframe, selectedProduct, filterProductsByCategory, getTimeframeAdjustedData]);

  // Highlight product in chart when selectedProduct changes
  useEffect(() => {
    if (svgRef.current) {
      highlightProductInChart(selectedProduct);
    }
  }, [selectedProduct, highlightProductInChart]);

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

  // Interactive Guide Modal Component
  const InteractiveGuide = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showGuide ? '' : 'hidden'}`}>
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Product Flow Network Guide</h2>
            <button
              onClick={() => setShowGuide(false)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">📊 Understanding the Chord Diagram</h3>
              <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                <p><strong>Departments (Arcs):</strong> Each colored arc represents a department (Kitchen, Bar, Restaurant, etc.)</p>
                <p><strong>Product Flows (Ribbons):</strong> Curved ribbons show product movement between departments</p>
                <p><strong>Ribbon Thickness:</strong> Thicker ribbons indicate higher product flow volume</p>
                <p><strong>Colors:</strong> Each department has a unique color for easy identification</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">🎯 How to Interact</h3>
              <div className="bg-green-50 rounded-lg p-4 space-y-2">
                <p><strong>Click Department Arc:</strong> View all products and metrics for that department</p>
                <p><strong>Click Flow Ribbon:</strong> See detailed flow information between two departments</p>
                <p><strong>Hover Elements:</strong> Highlight related connections and see tooltips</p>
                <p><strong>Use Timeframes:</strong> Switch between hourly, daily, weekly views for different insights</p>
                <p><strong>Search Products:</strong> Find specific products across all departments</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">🔍 Business Insights</h3>
              <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                <p><strong>Flow Patterns:</strong> Identify which departments are major suppliers/consumers</p>
                <p><strong>Bottlenecks:</strong> Spot departments with unusually high or low activity</p>
                <p><strong>Cross-Location Analysis:</strong> Compare product performance across different locations</p>
                <p><strong>Time-based Trends:</strong> See how product flows change over different time periods</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">⚠️ Status Indicators</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-semibold">Normal</span>
                  </div>
                  <p className="text-sm">Optimal consumption levels</p>
                </div>
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="font-semibold">Over-Consumed</span>
                  </div>
                  <p className="text-sm">Usage exceeds expectations</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="font-semibold">Expiry Near</span>
                  </div>
                  <p className="text-sm">Products expiring soon</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-semibold">Under-Consumed</span>
                  </div>
                  <p className="text-sm">Low usage, potential waste</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">💡 Pro Tips</h3>
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <p>• Use different timeframes to spot seasonal patterns</p>
                <p>• Search for specific products to track their journey across locations</p>
                <p>• Click business impact filters to identify operational issues</p>
                <p>• Compare financial metrics to optimize procurement decisions</p>
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
          <div className="flex items-center gap-3">
            {/* Timeframe Filters */}
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              {[
                { key: 'hourly', label: 'Hourly', icon: Clock },
                { key: 'daily', label: 'Daily', icon: Calendar },
                { key: 'weekly', label: 'Weekly', icon: BarChart },
                { key: 'monthly', label: 'Monthly', icon: TrendUp },
                { key: 'quarterly', label: 'Quarterly', icon: BarChart3 },
                { key: 'yearly', label: 'Yearly', icon: TrendingUp }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedTimeframe(key)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1 ${
                    selectedTimeframe === key
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </button>
              ))}
            </div>
            
            {/* Guide Button */}
            <button
              onClick={() => setShowGuide(true)}
              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
              title="Show Guide"
            >
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Search */}
        <div className="mb-4">
          <div className="flex gap-3 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search products (e.g., Fresh Fish, Premium Wine...)"
                value={productSearchQuery}
                onChange={(e) => setProductSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {productSearchQuery && (
                <button
                  onClick={() => setProductSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            {selectedProduct && (
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Clear Selection
              </button>
            )}
          </div>
          {productSearchQuery && (
            <div className="mt-2">
              <div className="text-sm text-slate-600 mb-2">
                Found {getFilteredProducts().length} products matching "{productSearchQuery}"
              </div>
              {getFilteredProducts().length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {getFilteredProducts().slice(0, 5).map((product, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedProduct(product.name);
                        setSelectedItem(null);
                        setSelectedBusinessMetric(null);
                      }}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        selectedProduct === product.name
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-purple-400'
                      }`}
                    >
                      {product.name} ({product.department})
                    </button>
                  ))}
                  {getFilteredProducts().length > 5 && (
                    <span className="text-xs text-slate-500 px-2 py-1">
                      +{getFilteredProducts().length - 5} more
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Chart - 2/3 width */}
          <div className="col-span-2">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4">
              <svg ref={svgRef} style={{ minHeight: '600px' }}></svg>
            </div>
            <div className="mt-4 space-y-2">
              <p className="text-center text-slate-500 text-sm">
                Click on departments or flows to view detailed analytics
              </p>
              {selectedProduct && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-semibold text-red-700">
                      {selectedProduct} Flow Visualization
                    </span>
                  </div>
                  <div className="text-xs text-red-600 text-center space-y-1">
                    <p>🔴 <strong>Highlighted departments:</strong> Where {selectedProduct} is used</p>
                    <p>🔗 <strong>Highlighted flows:</strong> Product movement between departments</p>
                    <p>⚫ <strong>Dimmed areas:</strong> Not related to {selectedProduct}</p>
                  </div>
                  <div className="mt-2 text-center">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="text-xs text-red-600 hover:text-red-800 underline"
                    >
                      Clear highlighting
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Drawer - Selected Item Details */}
          <div className="space-y-4 max-h-[700px] overflow-y-auto">
            {selectedProduct ? (
              <>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200 sticky top-0">
                  <h3 className="font-bold text-slate-900 mb-3">{selectedProduct} - Cross-Location Analysis</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Locations:</strong> {getProductCrossLocationData(selectedProduct).length} locations</p>
                    <p><strong>Total Flow:</strong> {getProductCrossLocationData(selectedProduct).reduce((sum, p) => sum + p.locationFlow, 0)} units/{selectedTimeframe.slice(0, -2)}</p>
                    <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-xs font-semibold text-red-700">Highlighted in Chart:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {getProductDepartments(selectedProduct).map((dept, idx) => (
                          <span key={idx} className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded">
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Performance by Location</h4>
                  {getProductCrossLocationData(selectedProduct).map((product, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-3 border-l-4 border-purple-500 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-bold text-slate-800 text-sm">{product.location}</h5>
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
                            <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium ${
                              product.locationStatus === 'over-consumed' ? 'bg-red-100 text-red-800' :
                              product.locationStatus === 'expiry-near' ? 'bg-orange-100 text-orange-800' :
                              product.locationStatus === 'under-consumed' ? 'bg-yellow-100 text-yellow-800' :
                              product.locationStatus === 'dead-stock' ? 'bg-red-100 text-red-800' :
                              product.locationStatus === 'occasional' ? 'bg-purple-100 text-purple-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {product.locationStatus === 'over-consumed' ? '⚠️ Over-Consumed' :
                               product.locationStatus === 'expiry-near' ? '🔥 Expiry Near' :
                               product.locationStatus === 'under-consumed' ? '📉 Under-Consumed' :
                               product.locationStatus === 'dead-stock' ? '💀 Dead Stock' :
                               product.locationStatus === 'occasional' ? '🔮 Occasional' :
                               '✓ Normal'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-purple-600">{product.locationFlow}</p>
                          <p className="text-xs text-slate-500">units/{selectedTimeframe.slice(0, -2)}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t text-xs">
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
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : selectedItem ? (
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
                  <>
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200 sticky top-0">
                      <h3 className="font-bold text-slate-900 mb-3">Flow Details</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>From:</strong> {selectedItem.from}</p>
                        <p><strong>To:</strong> {selectedItem.to}</p>
                        <p><strong>Total Units:</strong> {selectedItem.value} units/{selectedTimeframe.slice(0, -2)}</p>
                        <p><strong>Products Flowing:</strong> {getFlowBreakdown(selectedItem.from, selectedItem.to).length} items</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-bold text-slate-900 text-sm">Product Breakdown - What makes up these {selectedItem.value} units</h4>
                      {getFlowBreakdown(selectedItem.from, selectedItem.to).map((product, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border-l-4 border-blue-500 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h5 className="font-bold text-slate-800 text-sm">{product.name}</h5>
                              <p className="text-xs text-slate-600 mt-1">
                                {product.flowPercentage}% of product flow → {product.flowAmount} units
                              </p>
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
                              <p className="text-lg font-bold text-blue-600">{product.flowAmount}</p>
                              <p className="text-xs text-slate-500">units/{selectedTimeframe.slice(0, -2)}</p>
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
              <>
                <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-4 border border-red-200 sticky top-0">
                  <h3 className="font-bold text-slate-900 mb-3">🚨 Critical Insights - Immediate Action Required</h3>
                  <div className="text-sm text-slate-700">
                    <p>Products requiring urgent attention across all locations</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-bold text-slate-900 text-sm">Priority Actions</h4>
                  {getCriticalInsights().slice(0, 6).map((insight, idx) => (
                    <div key={idx} className={`bg-white rounded-lg p-3 shadow-sm border-l-4 ${
                      insight.priority === 'critical' ? 'border-red-500' :
                      insight.priority === 'high' ? 'border-orange-500' : 'border-yellow-500'
                    }`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h5 className="font-bold text-slate-800 text-sm">{insight.name}</h5>
                          <p className="text-xs text-slate-600 mt-1">Department: {insight.department}</p>
                          <div className="flex gap-1 mt-1">
                            <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium ${
                              insight.priority === 'critical' ? 'bg-red-100 text-red-800' :
                              insight.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {insight.priority === 'critical' ? '🔥 CRITICAL' :
                               insight.priority === 'high' ? '⚠️ HIGH' : '📊 MEDIUM'}
                            </span>
                            <span className={`inline-block px-2 py-0.5 text-xs rounded font-medium ${
                              insight.status === 'expiry-near' ? 'bg-red-100 text-red-800' :
                              insight.status === 'over-consumed' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {insight.status === 'expiry-near' ? '⏰ Expiring Soon' :
                               insight.status === 'over-consumed' ? '📈 Over-Consumed' :
                               insight.status === 'dead-stock' ? '💀 Dead Stock' : insight.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${
                            insight.priority === 'critical' ? 'text-red-600' :
                            insight.priority === 'high' ? 'text-orange-600' : 'text-yellow-600'
                          }`}>
                            {insight.expiryDays < 7 ? `${insight.expiryDays}d` : `${insight.flow}`}
                          </p>
                          <p className="text-xs text-slate-500">
                            {insight.expiryDays < 7 ? 'expires' : 'units/day'}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t text-xs">
                        <div>
                          <p className="text-slate-500">Cost</p>
                          <p className="font-bold text-red-600">${insight.cost.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Revenue</p>
                          <p className="font-bold text-green-600">${insight.revenue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-slate-500">Action</p>
                          <p className="font-bold text-blue-600">
                            {insight.status === 'expiry-near' ? 'Use Now' :
                             insight.status === 'over-consumed' ? 'Reduce' : 'Review'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mt-4">
                    <p className="text-xs text-blue-700 text-center">
                      💡 <strong>Tip:</strong> Click on departments, flows, or search products for detailed analysis
                    </p>
                  </div>
                </div>
              </>
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

      {/* Interactive Guide Modal */}
      <InteractiveGuide />
    </div>
  );
};

export default OverviewTab;
