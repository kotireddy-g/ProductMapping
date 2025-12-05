import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { medicineCategories, hospitalDepartments, chordConnections } from '../../data/unifiedPharmaData';

const AnimatedChordDiagram = ({ onCategoryClick, onDepartmentClick, selectedLevel }) => {
  const svgRef = useRef(null);
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedL1, setSelectedL1] = useState(null);
  const [selectedL2, setSelectedL2] = useState(null);

  const getLevel2Items = () => {
    if (!selectedL1) return [];
    return hospitalDepartments.level2[selectedL1] || [];
  };

  const getLevel3Items = () => {
    if (!selectedL2) return [];
    return hospitalDepartments.level3[selectedL2] || [];
  };

  const rightSideItems = selectedL2 
    ? getLevel3Items() 
    : selectedL1 
      ? getLevel2Items() 
      : hospitalDepartments.level1;

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = svgRef.current.clientWidth;
    const height = 400;
    const leftX = 150;
    const rightX = width - 200;

    const leftNodes = medicineCategories.map((cat, i) => ({
      ...cat,
      x: leftX,
      y: 60 + i * 55,
      side: 'left'
    }));

    const rightNodes = rightSideItems.map((dept, i) => ({
      ...dept,
      x: rightX,
      y: 60 + i * (300 / Math.max(rightSideItems.length, 1)),
      side: 'right'
    }));

    const connections = [];
    leftNodes.forEach(left => {
      rightNodes.forEach(right => {
        const existingConnection = chordConnections.find(
          c => c.source === left.id && c.target === right.id
        );
        const strength = existingConnection ? existingConnection.value / 120 : 0.3 + (left.itemCount / 1000);
        connections.push({
          source: left,
          target: right,
          strength: Math.min(1, strength),
          color: left.color
        });
      });
    });

    const defs = svg.append('defs');
    
    connections.forEach((conn, i) => {
      const gradient = defs.append('linearGradient')
        .attr('id', `gradient-${i}`)
        .attr('x1', '0%')
        .attr('y1', '0%')
        .attr('x2', '100%')
        .attr('y2', '0%');
      
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', conn.color)
        .attr('stop-opacity', 0.6);
      
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', conn.color)
        .attr('stop-opacity', 0.2);
    });

    const linksGroup = svg.append('g').attr('class', 'links');
    
    connections.forEach((conn, i) => {
      const midX = (conn.source.x + conn.target.x) / 2;
      const path = linksGroup.append('path')
        .attr('d', `M ${conn.source.x + 60} ${conn.source.y + 12} 
                    C ${midX} ${conn.source.y + 12}, 
                      ${midX} ${conn.target.y + 10}, 
                      ${conn.target.x - 10} ${conn.target.y + 10}`)
        .attr('fill', 'none')
        .attr('stroke', `url(#gradient-${i})`)
        .attr('stroke-width', Math.max(1, conn.strength * 3))
        .attr('opacity', 0.4)
        .style('pointer-events', 'none');

      const totalLength = path.node().getTotalLength();
      path
        .attr('stroke-dasharray', `${totalLength / 4} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .delay(i * 20)
        .duration(2000)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0)
        .on('end', function repeat() {
          d3.select(this)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(3000 + Math.random() * 2000)
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0)
            .on('end', repeat);
        });
    });

    const leftGroup = svg.append('g').attr('class', 'left-nodes');
    leftNodes.forEach(node => {
      const g = leftGroup.append('g')
        .attr('transform', `translate(${node.x - 60}, ${node.y})`)
        .style('cursor', 'pointer')
        .on('click', () => onCategoryClick && onCategoryClick(node));

      g.append('rect')
        .attr('width', 120)
        .attr('height', 45)
        .attr('rx', 8)
        .attr('fill', node.color + '20')
        .attr('stroke', node.color)
        .attr('stroke-width', 2);

      g.append('text')
        .attr('x', 60)
        .attr('y', 18)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '10px')
        .attr('font-weight', '600')
        .text(node.name.split(' ')[0]);

      g.append('text')
        .attr('x', 60)
        .attr('y', 32)
        .attr('text-anchor', 'middle')
        .attr('fill', node.color)
        .attr('font-size', '11px')
        .attr('font-weight', '700')
        .text(`${node.itemCount} items`);
    });

    const rightGroup = svg.append('g').attr('class', 'right-nodes');
    rightNodes.forEach((node, i) => {
      const g = rightGroup.append('g')
        .attr('transform', `translate(${node.x - 10}, ${node.y})`)
        .style('cursor', 'pointer')
        .on('click', () => {
          if (!selectedL1) {
            setSelectedL1(node.id);
          } else if (!selectedL2) {
            setSelectedL2(node.id);
          }
          onDepartmentClick && onDepartmentClick(node);
        });

      const parentColor = hospitalDepartments.level1.find(l => l.id === selectedL1)?.color || '#64748b';
      const nodeColor = node.color || parentColor;

      g.append('rect')
        .attr('width', 180)
        .attr('height', 28)
        .attr('rx', 6)
        .attr('fill', nodeColor + '15')
        .attr('stroke', nodeColor)
        .attr('stroke-width', 1.5);

      g.append('text')
        .attr('x', 90)
        .attr('y', 18)
        .attr('text-anchor', 'middle')
        .attr('fill', 'white')
        .attr('font-size', '10px')
        .text(node.name.length > 24 ? node.name.substring(0, 22) + '...' : node.name);
    });

  }, [selectedL1, selectedL2, onCategoryClick, onDepartmentClick, rightSideItems]);

  const handleBack = () => {
    if (selectedL2) {
      setSelectedL2(null);
    } else if (selectedL1) {
      setSelectedL1(null);
    }
  };

  const getBreadcrumb = () => {
    const parts = ['Departments'];
    if (selectedL1) {
      const l1 = hospitalDepartments.level1.find(d => d.id === selectedL1);
      if (l1) parts.push(l1.name);
    }
    if (selectedL2) {
      const l2Items = hospitalDepartments.level2[selectedL1] || [];
      const l2 = l2Items.find(d => d.id === selectedL2);
      if (l2) parts.push(l2.name);
    }
    return parts;
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-white font-semibold">Medicine Category to Department Flow</h3>
          <div className="flex items-center gap-2 mt-1">
            {getBreadcrumb().map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span className="text-slate-500">›</span>}
                <span className={`text-xs ${i === getBreadcrumb().length - 1 ? 'text-blue-400' : 'text-slate-400'}`}>
                  {part}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
        {(selectedL1 || selectedL2) && (
          <button
            onClick={handleBack}
            className="px-3 py-1.5 bg-slate-700 text-white text-sm rounded-lg hover:bg-slate-600 transition-colors"
          >
            ← Back
          </button>
        )}
      </div>
      <svg ref={svgRef} className="w-full" style={{ height: '400px' }} />
    </div>
  );
};

export default AnimatedChordDiagram;
