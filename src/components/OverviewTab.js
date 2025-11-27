import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { BarChart3, Layers } from 'lucide-react';
import { generateChordData, createChordMatrix } from '../data/syntheticChordData';

function OverviewTab() {
  const svgRef = useRef();
  const [drillDownLevel, setDrillDownLevel] = useState('category');
  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredRibbon, setHoveredRibbon] = useState(null);
  const chordDataRef = useRef(null);

  // Initialize data once
  if (!chordDataRef.current) {
    chordDataRef.current = generateChordData();
  }

  const data = chordDataRef.current;

  // Draw chord diagram
  useEffect(() => {
    if (!svgRef.current) return;

    const { matrix, nodes } = createChordMatrix(data.products, drillDownLevel);

    // Dimensions
    const width = 1000;
    const height = 800;
    const innerRadius = Math.min(width, height) * 0.35;
    const outerRadius = innerRadius + 40;

    // Clear previous SVG
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [0, 0, width, height]);

    // Create main group centered
    const g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Color scale - use consistent colors
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // Chord layout
    const chord = d3.chord().padAngle(0.05).sortSubgroups(d3.descending);
    const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
    const ribbon = d3.ribbon().source((d) => d.source).target((d) => d.target);

    const chords = chord(matrix);

    // Draw ribbons (connections) - FIRST (so they appear behind)
    const ribbonGroup = g.append('g').attr('fill-opacity', 0.67);

    ribbonGroup
      .selectAll('path')
      .data(chords)
      .join('path')
      .attr('d', ribbon)
      .attr('fill', (d) => color(d.source.index))
      .attr('stroke', (d) => d3.rgb(color(d.source.index)).darker())
      .attr('opacity', 0.5)
      .style('transition', 'opacity 0.2s ease')
      .on('mouseenter', function (event, d) {
        setHoveredRibbon(d);
        d3.select(this).attr('opacity', 1).attr('stroke-width', 2.5);
        
        // Fade other ribbons
        ribbonGroup.selectAll('path').attr('opacity', (otherD) => {
          return (otherD.source.index === d.source.index || otherD.target.index === d.target.index) ? 1 : 0.1;
        });
      })
      .on('mouseleave', function () {
        setHoveredRibbon(null);
        ribbonGroup.selectAll('path').attr('opacity', 0.5).attr('stroke-width', 1);
      });

    // Draw groups (arcs) - SECOND (so they appear on top)
    const groupGroup = g.append('g');

    const groups = groupGroup
      .selectAll('g')
      .data(chords.groups)
      .join('g');

    groups
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.index))
      .attr('stroke', (d) => d3.rgb(color(d.index)).darker())
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .style('transition', 'opacity 0.2s ease')
      .on('mouseenter', function (event, d) {
        setHoveredNode(nodes[d.index]);
        d3.select(this).attr('opacity', 1);
        
        // Highlight related ribbons
        ribbonGroup.selectAll('path').attr('opacity', (ribbonD) => {
          return ribbonD.source.index === d.index || ribbonD.target.index === d.index ? 1 : 0.1;
        });
      })
      .on('mouseleave', function () {
        setHoveredNode(null);
        d3.select(this).attr('opacity', 0.8);
        ribbonGroup.selectAll('path').attr('opacity', 0.5);
      });

    // Add labels
    groups
      .append('text')
      .each((d) => {
        d.angle = (d.startAngle + d.endAngle) / 2;
      })
      .attr('dy', '0.35em')
      .attr(
        'transform',
        (d) =>
          `rotate(${(d.angle * 180) / Math.PI - 90}) translate(${outerRadius + 50}) ${
            d.angle > Math.PI ? 'rotate(180)' : ''
          }`
      )
      .attr('text-anchor', (d) => (d.angle > Math.PI ? 'end' : null))
      .attr('font-size', '14px')
      .attr('font-weight', '600')
      .attr('fill', '#1e293b')
      .attr('pointer-events', 'none')
      .text((d) => nodes[d.index]);

    // Add title
    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-size', '20px')
      .attr('font-weight', 'bold')
      .attr('fill', '#1e293b')
      .text(`Product Journey: ${drillDownLevel === 'category' ? 'Products → Categories' : drillDownLevel === 'location' ? 'Categories → Locations' : 'Locations → Functions'}`);
  }, [drillDownLevel, data.products]);

  const { matrix, nodes } = createChordMatrix(data.products, drillDownLevel);
  const totalConnections = matrix.flat().reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 size={32} />
          <h1 className="text-3xl font-bold">Executive Overview - Product Journey</h1>
        </div>
        <p className="text-blue-100">
          Complete visibility of your procurement hierarchy - See how products flow through categories, locations, and functions
        </p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Layers size={20} className="text-blue-600" />
            <label className="font-semibold text-slate-900">Drill-Down Level:</label>
          </div>

          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'category', label: 'Products → Categories' },
              { value: 'location', label: 'Categories → Locations' },
              { value: 'function', label: 'Locations → Functions' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setDrillDownLevel(option.value);
                  setHoveredNode(null);
                  setHoveredRibbon(null);
                }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  drillDownLevel === option.value
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Chord Diagram - FULL SIZE */}
          <div className="flex-1 flex justify-center items-center">
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-4 w-full">
              <svg
                ref={svgRef}
                className="w-full"
                style={{ minHeight: '800px', display: 'block' }}
              />
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="lg:w-96 space-y-4">
            {/* Summary Stats */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
              <div className="text-sm text-blue-700 mb-2 font-semibold">Total Connections</div>
              <div className="text-4xl font-bold text-blue-900">{totalConnections}</div>
              <div className="text-xs text-blue-600 mt-2">Products flowing through the system</div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
              <div className="text-sm text-purple-700 mb-2 font-semibold">Active Nodes</div>
              <div className="text-4xl font-bold text-purple-900">{nodes.length}</div>
              <div className="text-xs text-purple-600 mt-2">Unique items in this level</div>
            </div>

            {/* Selected Node Info */}
            {hoveredNode && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
                <div className="text-sm text-green-700 mb-2 font-semibold">Currently Viewing</div>
                <div className="text-2xl font-bold text-green-900 break-words">{hoveredNode}</div>
                <div className="text-xs text-green-600 mt-3">Hover over nodes to see details</div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
              <div className="text-sm font-semibold text-slate-900 mb-4">How to Use</div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex gap-2">
                  <span>✨</span>
                  <span><strong>Hover ribbons</strong> to see connections</span>
                </li>
                <li className="flex gap-2">
                  <span>🎯</span>
                  <span><strong>Hover nodes</strong> to highlight related items</span>
                </li>
                <li className="flex gap-2">
                  <span>🔄</span>
                  <span><strong>Click buttons</strong> to change perspective</span>
                </li>
                <li className="flex gap-2">
                  <span>📊</span>
                  <span><strong>Colors</strong> represent different categories</span>
                </li>
              </ul>
            </div>

            {/* Node List */}
            <div className="bg-slate-50 rounded-lg p-6 border border-slate-200 max-h-64 overflow-y-auto">
              <div className="text-sm font-semibold text-slate-900 mb-4">All Nodes ({nodes.length})</div>
              <div className="space-y-2">
                {nodes.map((node, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-3 p-3 rounded cursor-pointer transition-all ${
                      hoveredNode === node ? 'bg-blue-100 border border-blue-300' : 'hover:bg-slate-200'
                    }`}
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: d3.schemeCategory10[idx % 10] }}
                    />
                    <span className="text-sm text-slate-700 truncate font-medium">{node}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Information Panel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
          <div className="text-sm text-blue-700 font-semibold mb-2">💡 For CEO/COO</div>
          <p className="text-sm text-blue-600">
            See the complete product journey at a glance. Understand how products flow through your organization's hierarchy.
          </p>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <div className="text-sm text-purple-700 font-semibold mb-2">🎯 Key Insights</div>
          <p className="text-sm text-purple-600">
            Identify concentration patterns, spot bottlenecks, and optimize your procurement strategy.
          </p>
        </div>
        <div className="bg-green-50 rounded-lg p-6 border border-green-200">
          <div className="text-sm text-green-700 font-semibold mb-2">📈 Data-Driven</div>
          <p className="text-sm text-green-600">
            Synthetic data shown for demo. Connect to your API for real-time procurement visibility.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OverviewTab;
