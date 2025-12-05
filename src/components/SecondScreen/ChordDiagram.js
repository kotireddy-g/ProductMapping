import React, { useState, useMemo } from 'react';
import { medicineCategories, hospitalAreas, flowConnections } from '../../data/consistentSyntheticData';

const ChordDiagram = ({ onLeftNodeClick, onRightNodeClick, currentDataSet = 1 }) => {
  const [selectedRightNode, setSelectedRightNode] = useState(null);
  const [hoveredConnection, setHoveredConnection] = useState(null);
  const [filterBy, setFilterBy] = useState('Areas');

  // Get OTIF-based color for ribbons
  const getOtifColor = (otif) => {
    if (otif >= 90) return '#22c55e'; // Green - Good OTIF (>90%)
    if (otif >= 80) return '#eab308'; // Yellow - Medium OTIF (80-90%)
    if (otif >= 70) return '#f97316'; // Orange - Low OTIF (70-80%)
    return '#ef4444'; // Red - Poor OTIF (<70%)
  };

  // Get ribbon thickness based on quantity
  const getRibbonThickness = (quantity, maxQuantity) => {
    const minThickness = 2;
    const maxThickness = 20;
    const ratio = quantity / maxQuantity;
    return minThickness + (ratio * (maxThickness - minThickness));
  };

  // Calculate positions and dimensions
  const leftNodes = Object.values(medicineCategories);
  const rightNodes = Object.values(hospitalAreas);
  
  const diagramWidth = 800;
  const diagramHeight = 600;
  const nodeWidth = 120;
  const nodeHeight = 35;
  const leftX = 50;
  const rightX = diagramWidth - nodeWidth - 50;
  const nodeSpacing = 70;

  // Calculate maximum quantity for ribbon scaling
  const maxQuantity = Math.max(...flowConnections.map(conn => conn.quantity));

  // Handle right node click for drill-down
  const handleRightNodeClick = (node) => {
    if (selectedRightNode?.id === node.id) {
      setSelectedRightNode(null);
    } else {
      setSelectedRightNode(node);
      if (onRightNodeClick) onRightNodeClick(node);
    }
  };

  // Handle left node click for forecast navigation
  const handleLeftNodeClick = (node) => {
    if (onLeftNodeClick) onLeftNodeClick(node);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      {/* Header with Movement Speed Legend */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Supply Chain Flow Analysis</h3>
            <p className="text-sm text-slate-500">Click on ribbons to view RCA & Recommendations</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">Filter by:</span>
            <select 
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-1 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Areas</option>
              <option>Specialties</option>
              <option>Wards</option>
            </select>
          </div>
        </div>

        {/* Movement Speed Legend */}
        <div className="flex items-center gap-6 text-sm mb-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Movement Speed:</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-green-500"></div>
              <span className="text-slate-600">Fast</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-yellow-500"></div>
              <span className="text-slate-600">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-orange-500"></div>
              <span className="text-slate-600">Slow</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-red-500"></div>
              <span className="text-slate-600">Occasional</span>
            </div>
          </div>
        </div>

        {/* Thickness Legend */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-slate-600">Thickness = Consumption:</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-2 rounded bg-slate-500"></div>
              <span className="text-slate-600">Over</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 rounded bg-slate-500"></div>
              <span className="text-slate-600">Normal</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded bg-slate-500"></div>
              <span className="text-slate-600">Under</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chord Diagram */}
      <div className="relative">
        <svg width={diagramWidth} height={diagramHeight} className="mx-auto">
          {/* Ribbons/Connections */}
          {flowConnections.map((connection, index) => {
            const sourceIndex = leftNodes.findIndex(node => node.name === connection.source);
            const targetIndex = rightNodes.findIndex(node => node.name === connection.target);
            
            if (sourceIndex === -1 || targetIndex === -1) return null;

            const sourceY = 50 + sourceIndex * nodeSpacing + nodeHeight / 2;
            const targetY = 50 + targetIndex * nodeSpacing + nodeHeight / 2;
            const thickness = getRibbonThickness(connection.quantity, maxQuantity);
            const color = getOtifColor(connection.otif);
            
            const isHovered = hoveredConnection === index;
            
            // Create curved path for ribbon
            const path = `M ${leftX + nodeWidth} ${sourceY - thickness/2} 
                         C ${leftX + nodeWidth + 150} ${sourceY - thickness/2} ${rightX - 150} ${targetY - thickness/2} ${rightX} ${targetY - thickness/2}
                         L ${rightX} ${targetY + thickness/2}
                         C ${rightX - 150} ${targetY + thickness/2} ${leftX + nodeWidth + 150} ${sourceY + thickness/2} ${leftX + nodeWidth} ${sourceY + thickness/2}
                         Z`;

            return (
              <path
                key={index}
                d={path}
                fill={color}
                fillOpacity={isHovered ? 0.8 : 0.6}
                stroke={isHovered ? '#1f2937' : 'none'}
                strokeWidth={isHovered ? 1 : 0}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredConnection(index)}
                onMouseLeave={() => setHoveredConnection(null)}
                onClick={() => {
                  // Navigate to RCA & Recommendations
                  console.log('Navigate to RCA for:', connection);
                }}
              />
            );
          })}

          {/* Left Nodes (Medicine Categories) */}
          {leftNodes.map((node, index) => {
            const y = 50 + index * nodeSpacing;
            
            return (
              <g key={node.id}>
                <rect
                  x={leftX}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  fill="#3b82f6"
                  rx={4}
                  className="cursor-pointer transition-all duration-200 hover:fill-blue-600"
                  onClick={() => handleLeftNodeClick(node)}
                />
                <text
                  x={leftX + nodeWidth / 2}
                  y={y + nodeHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-sm font-medium pointer-events-none"
                >
                  {node.name}
                </text>
                <text
                  x={leftX + nodeWidth / 2}
                  y={y + nodeHeight + 15}
                  textAnchor="middle"
                  className="fill-slate-600 text-xs pointer-events-none"
                >
                  {node.totalUnits.toLocaleString()} units
                </text>
              </g>
            );
          })}

          {/* Right Nodes (Hospital Areas) */}
          {rightNodes.map((node, index) => {
            const y = 50 + index * nodeSpacing;
            const isSelected = selectedRightNode?.id === node.id;
            
            return (
              <g key={node.id}>
                <rect
                  x={rightX}
                  y={y}
                  width={nodeWidth}
                  height={nodeHeight}
                  fill="#3b82f6"
                  rx={4}
                  className="cursor-pointer transition-all duration-200 hover:fill-blue-600"
                  stroke={isSelected ? '#1f2937' : 'none'}
                  strokeWidth={isSelected ? 2 : 0}
                  onClick={() => handleRightNodeClick(node)}
                />
                <text
                  x={rightX + nodeWidth / 2}
                  y={y + nodeHeight / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-white text-sm font-medium pointer-events-none"
                >
                  {node.name.length > 20 ? node.name.substring(0, 18) + '...' : node.name}
                </text>
                <text
                  x={rightX + nodeWidth / 2}
                  y={y + nodeHeight + 15}
                  textAnchor="middle"
                  className="fill-slate-600 text-xs pointer-events-none"
                >
                  {node.totalUnits.toLocaleString()} units
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Drill-down Panel */}
      {selectedRightNode && (
        <div className="mt-6 bg-slate-50 rounded-lg p-4">
          <h4 className="font-semibold text-slate-900 mb-3">
            {selectedRightNode.name} - Detailed Breakdown
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(selectedRightNode.level2).map(([key, category]) => (
              <div key={key} className="bg-white rounded-lg p-3 border border-slate-200">
                <h5 className="font-medium text-slate-800 mb-2">{category.name}</h5>
                <div className="text-sm text-slate-600 mb-2">
                  Units: {category.units.toLocaleString()}
                </div>
                <div className="space-y-1">
                  {category.level3.map((item, index) => (
                    <div key={index} className="text-sm text-slate-600 flex items-center justify-between">
                      <span>{item}</span>
                      <span className="text-xs text-slate-500">
                        {Math.floor(category.units / category.level3.length)} units
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tooltip for hovered connection */}
      {hoveredConnection !== null && (
        <div className="absolute top-4 right-4 bg-slate-800 text-white p-3 rounded-lg shadow-lg text-sm">
          <div className="font-medium">
            {flowConnections[hoveredConnection].source} → {flowConnections[hoveredConnection].target}
          </div>
          <div>Quantity: {flowConnections[hoveredConnection].quantity.toLocaleString()} units</div>
          <div>OTIF: {flowConnections[hoveredConnection].otif}%</div>
        </div>
      )}
    </div>
  );
};

export default ChordDiagram;
