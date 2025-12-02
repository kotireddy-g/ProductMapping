# ExperienceFlow Multi-Vertical Procurement Intelligence Platform

## Project Overview
ExperienceFlow is a comprehensive procurement management system supporting multiple verticals including Hospitality, Supermarket, and Hospital Pharma sectors. The platform features product labeling using Reinforcement Learning concepts and provides detailed procurement analytics with an interactive hierarchical bipartite chord diagram for product flow visualization.

## Project Type
- **Framework**: React 18 with Create React App
- **Build Tool**: react-scripts (webpack-based)
- **Styling**: Tailwind CSS
- **Visualization**: Recharts, D3.js (bipartite chord diagram)
- **Icons**: Lucide React

## Current State
- **Status**: Fully configured and running in Replit environment
- **Last Updated**: December 2, 2025
- **Environment**: Development server running on port 5000

## Project Structure
```
src/
├── components/          # React components
│   ├── BipartiteChord.js    # D3-based hierarchical chord diagram with drill-down
│   ├── DetailDrawer.js
│   ├── FilterPanel.js
│   ├── OverviewTab.js       # Main overview with flow visualization
│   ├── PerformanceMetrics.js
│   ├── ProductJourney.js
│   ├── ProductLabelingPanel.js
│   └── SearchBar.js
├── data/               # Mock data and synthetic data
│   ├── hierarchicalData.js  # 5-level hierarchical product data with flows
│   ├── mockData.js
│   ├── syntheticChordData.js
│   └── verticalData.js
├── App.js             # Main application component (single-page layout)
├── index.css          # Global styles with Tailwind
└── index.js           # Entry point
```

## Configuration

### Development Environment
- **Port**: 5000 (configured via environment variables)
- **Host**: 0.0.0.0 (allows Replit proxy)
- **Host Check**: Disabled (required for Replit iframe proxy)
- **WebSocket Port**: 0 (dynamic allocation)

### Environment Variables (Development)
- `PORT=5000` - Development server port
- `HOST=0.0.0.0` - Bind to all interfaces
- `DANGEROUSLY_DISABLE_HOST_CHECK=true` - Allow Replit proxy
- `WDS_SOCKET_PORT=0` - Dynamic WebSocket port

### Workflow
- **Name**: Start application
- **Command**: `npm start`
- **Output**: webview on port 5000
- **Status**: Running

### Deployment
- **Type**: static
- **Build Command**: `npm run build`
- **Public Directory**: build
- **Homepage**: /product-mapping

## Features
1. **Single-Page Layout**: Three section buttons (Overview, Product Journey, Product Labeling)
2. **Bipartite Chord Diagram**: Interactive D3.js visualization showing product flows between categories and locations
   - Color coding: Green (fast), Yellow (medium), Orange (slow), Red (occasional)
   - Ribbon width: Based on consumption level (over, normal, under)
   - 5-level drill-down: Category → Subcategory → Type → Brand → Product
   - Breadcrumb navigation for easy backtracking
3. **Product Journey Tab**: Track product consumption with performance metrics
4. **Product Labeling (RL)**: Review and manage products labeled by Reinforcement Learning
5. **Detail Drawer**: Comprehensive product analysis with trend charts

## Hierarchical Data Structure
The bipartite chord diagram uses a hierarchical data structure:
- **Categories**: Top-level product categories (Fresh Produce, Dairy, etc.)
- **Subcategories**: Groupings within categories (Vegetables, Fruits, etc.)
- **Types**: Specific types (Leafy Greens, Root Vegetables, etc.)
- **Brands**: Product brands (Farm Fresh, Green Garden, etc.)
- **Products**: Individual products (Organic Lettuce, Spinach, etc.)

Each level has:
- `connectedAreas`: Array of area IDs this item connects to
- `areaFlows`: Object mapping area IDs to { volume, consumption } data
- `movement`: Speed indicator (fast, medium, slow, occasional)
- `consumption`: Level indicator (over, normal, under)

## Supported Verticals
1. **Hospitality**: Hotels, restaurants, catering (with complete hierarchical data)
2. **Supermarket**: Retail grocery operations
3. **Hospital Pharma**: Hospital pharmaceutical procurement

## Dependencies
- React 18.2.0
- react-scripts 5.0.1
- Tailwind CSS 3.3.0
- Recharts 2.10.3
- D3.js 7.8.5
- Lucide React 0.263.1

## Recent Changes
- December 2, 2025: UI Redesign
  - Implemented single-page layout with section buttons
  - Created BipartiteChord component with D3.js for product flow visualization
  - Added hierarchical data structure with 5-level drill-down capability
  - Color-coded ribbons for movement speed visualization
  - Width-coded ribbons for consumption level indication
  - Breadcrumb navigation for drill-down paths
  - Interactive guide/tooltip explaining chart usage
  - Fixed all ESLint warnings

- December 2, 2025: Initial Replit environment setup
  - Configured port 5000 for frontend
  - Set up environment variables for Replit compatibility
  - Configured workflow for development server
  - Set up static deployment configuration
  - All dependencies installed successfully

## Development
- **Start Dev Server**: `npm start` (runs on port 5000)
- **Build**: `npm run build`
- **Test**: `npm test`

## Architecture Notes
- Uses Create React App (CRA) - no custom webpack configuration
- Mock data is used throughout (no backend/API integration)
- State management is handled via React hooks (no Redux)
- Tailwind CSS with PostCSS for styling
- D3 used for bipartite chord diagrams with hierarchical drill-down
- Recharts for other visualizations
