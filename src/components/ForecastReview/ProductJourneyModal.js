import React, { useState } from 'react';
import { X } from 'lucide-react';

const ProductJourneyModal = ({ isOpen, onClose, selectedItem }) => {
  const [selectedLevel, setSelectedLevel] = useState(null);

  // Generate journey data based on selected item
  const generateJourneyData = () => {
    if (!selectedItem) return null;

    const medicineName = selectedItem.sku.split(' ')[1] || 'Medicine';
    const totalQuantity = parseInt(selectedItem.forecast?.split(' ')[0]) || 500;

    return {
      level1: {
        name: medicineName,
        quantity: totalQuantity,
        unit: 'units'
      },
      level2: [
        { name: 'ICU', stock: Math.floor(totalQuantity * 0.25), color: 'bg-slate-500' },
        { name: 'Emergency Ward', stock: Math.floor(totalQuantity * 0.20), color: 'bg-slate-500' },
        { name: 'General Ward', stock: Math.floor(totalQuantity * 0.30), color: 'bg-slate-500' },
        { name: 'Operation Theater', stock: Math.floor(totalQuantity * 0.15), color: 'bg-slate-500' },
        { name: 'Pharmacy Store', stock: Math.floor(totalQuantity * 0.10), color: 'bg-slate-500' }
      ],
      level3: [
        { name: 'ICU Usage', used: Math.floor(totalQuantity * 0.15), color: 'bg-green-500' },
        { name: 'Emergency Usage', used: Math.floor(totalQuantity * 0.12), color: 'bg-green-500' },
        { name: 'General Usage', used: Math.floor(totalQuantity * 0.18), color: 'bg-green-500' },
        { name: 'OT Usage', used: Math.floor(totalQuantity * 0.08), color: 'bg-green-500' },
        { name: 'Pharmacy Usage', used: Math.floor(totalQuantity * 0.05), color: 'bg-green-500' }
      ],
      level4: [
        { name: 'ICU Stock', stock: Math.floor(totalQuantity * 0.08), color: 'bg-orange-500' },
        { name: 'Emergency Stock', stock: Math.floor(totalQuantity * 0.06), color: 'bg-orange-500' },
        { name: 'General Stock', stock: Math.floor(totalQuantity * 0.10), color: 'bg-orange-500' },
        { name: 'OT Stock', stock: Math.floor(totalQuantity * 0.05), color: 'bg-orange-500' },
        { name: 'Pharmacy Stock', stock: Math.floor(totalQuantity * 0.03), color: 'bg-orange-500' }
      ],
      level5: [
        { name: 'Patient Care', stock: Math.floor(totalQuantity * 0.12), color: 'bg-blue-500' },
        { name: 'Procedures', stock: Math.floor(totalQuantity * 0.08), color: 'bg-blue-500' },
        { name: 'Outpatient', stock: Math.floor(totalQuantity * 0.05), color: 'bg-blue-500' }
      ]
    };
  };

  const journeyData = generateJourneyData();

  const levels = [
    { id: 1, title: 'Product', color: 'text-gray-700' },
    { id: 2, title: 'Distribution', color: 'text-gray-700' },
    { id: 3, title: 'Usage Count', color: 'text-gray-700' },
    { id: 4, title: 'Available Stock', color: 'text-gray-700' },
    { id: 5, title: 'Consumption', color: 'text-gray-700' }
  ];

  if (!isOpen || !journeyData) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="absolute inset-4 bg-white rounded-xl shadow-xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Product Journey</h2>
            <p className="text-sm text-gray-500 mt-1">
              {selectedItem?.sku} - Flow Analysis
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Level Headers */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
          {levels.map((level) => (
            <div key={level.id} className="flex-1 text-center">
              <div className="text-sm font-medium text-gray-600">Level {level.id}: {level.title}</div>
            </div>
          ))}
        </div>

        {/* Journey Visualization */}
        <div className="flex-1 overflow-auto p-6">
          <div className="relative h-full">
            <svg width="100%" height="600" className="mx-auto">
              {/* Level 1 - Product */}
              <g>
                <circle
                  cx="100"
                  cy="300"
                  r="60"
                  fill="#ef4444"
                  stroke="#dc2626"
                  strokeWidth="3"
                  className="cursor-pointer"
                />
                <text
                  x="100"
                  y="290"
                  textAnchor="middle"
                  className="fill-white text-sm font-semibold"
                >
                  {journeyData.level1.name}
                </text>
                <text
                  x="100"
                  y="310"
                  textAnchor="middle"
                  className="fill-white text-xs"
                >
                  {journeyData.level1.quantity}
                </text>
                <text
                  x="100"
                  y="325"
                  textAnchor="middle"
                  className="fill-white text-xs"
                >
                  {journeyData.level1.unit}
                </text>
              </g>

              {/* Level 2 - Distribution */}
              {journeyData.level2.map((item, index) => {
                const y = 100 + index * 100;
                return (
                  <g key={index}>
                    <rect
                      x="250"
                      y={y - 25}
                      width="120"
                      height="50"
                      rx="8"
                      fill="#64748b"
                      className="cursor-pointer"
                    />
                    <text
                      x="310"
                      y={y - 5}
                      textAnchor="middle"
                      className="fill-white text-xs font-medium"
                    >
                      {item.name}
                    </text>
                    <text
                      x="310"
                      y={y + 10}
                      textAnchor="middle"
                      className="fill-white text-xs"
                    >
                      Stock: {item.stock}
                    </text>
                    
                    {/* Connection line from Level 1 */}
                    <line
                      x1="160"
                      y1="300"
                      x2="250"
                      y2={y}
                      stroke="#dc2626"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                );
              })}

              {/* Level 3 - Usage Count */}
              {journeyData.level3.map((item, index) => {
                const y = 100 + index * 100;
                return (
                  <g key={index}>
                    <rect
                      x="420"
                      y={y - 25}
                      width="120"
                      height="50"
                      rx="8"
                      fill="#22c55e"
                      className="cursor-pointer"
                    />
                    <text
                      x="480"
                      y={y - 5}
                      textAnchor="middle"
                      className="fill-white text-xs font-medium"
                    >
                      {item.name}
                    </text>
                    <text
                      x="480"
                      y={y + 10}
                      textAnchor="middle"
                      className="fill-white text-xs"
                    >
                      Used: {item.used}
                    </text>
                    
                    {/* Connection line from Level 2 */}
                    <line
                      x1="370"
                      y1={y}
                      x2="420"
                      y2={y}
                      stroke="#64748b"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                );
              })}

              {/* Level 4 - Available Stock */}
              {journeyData.level4.map((item, index) => {
                const y = 100 + index * 100;
                return (
                  <g key={index}>
                    <rect
                      x="590"
                      y={y - 25}
                      width="120"
                      height="50"
                      rx="8"
                      fill="#f97316"
                      className="cursor-pointer"
                    />
                    <text
                      x="650"
                      y={y - 5}
                      textAnchor="middle"
                      className="fill-white text-xs font-medium"
                    >
                      {item.name}
                    </text>
                    <text
                      x="650"
                      y={y + 10}
                      textAnchor="middle"
                      className="fill-white text-xs"
                    >
                      Stock: {item.stock}
                    </text>
                    
                    {/* Connection line from Level 3 */}
                    <line
                      x1="540"
                      y1={y}
                      x2="590"
                      y2={y}
                      stroke="#22c55e"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  </g>
                );
              })}

              {/* Level 5 - Consumption */}
              {journeyData.level5.map((item, index) => {
                const y = 150 + index * 120;
                return (
                  <g key={index}>
                    <rect
                      x="760"
                      y={y - 25}
                      width="120"
                      height="50"
                      rx="8"
                      fill="#3b82f6"
                      className="cursor-pointer"
                    />
                    <text
                      x="820"
                      y={y - 5}
                      textAnchor="middle"
                      className="fill-white text-xs font-medium"
                    >
                      {item.name}
                    </text>
                    <text
                      x="820"
                      y={y + 10}
                      textAnchor="middle"
                      className="fill-white text-xs"
                    >
                      Stock: {item.stock}
                    </text>
                    
                    {/* Connection lines from Level 4 */}
                    {index < 2 && (
                      <>
                        <line
                          x1="710"
                          y1={100 + index * 100}
                          x2="760"
                          y2={y}
                          stroke="#f97316"
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                        <line
                          x1="710"
                          y1={200 + index * 100}
                          x2="760"
                          y2={y}
                          stroke="#f97316"
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                      </>
                    )}
                    {index === 2 && (
                      <line
                        x1="710"
                        y1="500"
                        x2="760"
                        y2={y}
                        stroke="#f97316"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                    )}
                  </g>
                );
              })}

              {/* Arrow marker definition */}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#666"
                  />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductJourneyModal;
