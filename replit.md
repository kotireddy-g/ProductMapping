# Hospital Pharma Procurement Intelligence Platform

## Project Overview
A specialized procurement intelligence platform for Hospital Pharmacy operations. The platform features authentication, pharmacy-specific KPIs, interactive chord diagram visualization for product flow analysis, real-time circuit flow animation for medicine distribution tracking, and comprehensive synthetic data for analytics.

## Project Type
- **Framework**: React 18 with Create React App
- **Build Tool**: react-scripts (webpack-based)
- **Styling**: Tailwind CSS
- **Visualization**: Recharts, D3.js (chord diagram, circuit flow animation)
- **Icons**: Lucide React

## Current State
- **Status**: Fully configured and running in Replit environment
- **Last Updated**: December 2, 2025
- **Environment**: Development server running on port 5000
- **Authentication**: Implemented (Login/Signup with form validation)

## Project Structure
```
src/
├── components/
│   ├── Auth/                    # Authentication components
│   │   ├── Login.js            # Login page with form validation
│   │   └── Signup.js           # Signup page with password requirements
│   ├── Overview/               # Overview tab components
│   │   ├── TopStats.js         # Top KPI stat cards (OTIF, Expiry, etc.)
│   │   ├── PharmaChodDiagram.js # D3 chord diagram with dynamic filters
│   │   ├── ConsumptionStats.js  # Consumption statistics cards
│   │   └── KPISection.js       # Sparkline KPI graphs
│   ├── ProductJourney/         # Product Journey tab components
│   │   └── LiveCircuitFlow.js  # Real-time D3 circuit flow animation
│   ├── BipartiteChord.js       # Legacy chord diagram
│   ├── DetailDrawer.js         # Product detail drawer
│   ├── FilterPanel.js          # Filter panel
│   ├── OverviewTab.js          # Main overview tab container
│   ├── PerformanceMetrics.js   # Performance metrics display
│   ├── ProductJourney.js       # Product journey container
│   ├── ProductLabelingPanel.js # RL-based product labeling
│   └── SearchBar.js            # Search functionality
├── data/
│   ├── pharmaChordData.js      # Pharmacy-specific chord diagram data
│   ├── hierarchicalData.js     # Hierarchical product data
│   ├── mockData.js             # General mock data
│   ├── syntheticChordData.js   # Synthetic data generators
│   └── verticalData.js         # Vertical-specific data (Hospital Pharma)
├── App.js                      # Main app with auth gating
├── index.css                   # Global Tailwind styles
└── index.js                    # Entry point
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

### Authentication
- Login and Signup pages with form validation
- Password strength requirements
- Session management via app-level state

### Overview Tab
1. **Top KPI Stats**: Stock Turnover Rate, Critical Stock Items, Expiry Alerts, Stock Rotation Score
2. **Chord Diagram**: Interactive D3.js visualization showing medicine flows
   - Dynamic filters: Areas (A-F), Specialities (12 options), Wards (multiple)
   - Color-coded ribbons based on movement speed
   - Width indicates consumption level
3. **Consumption Stats**: Over Consumption (urgent), Normal, Under Consumption
4. **KPI Section**: Sparkline graphs for OTIF, Cost Saving, Expiry Duration, Emergency Purchase Rate

### Product Journey Tab
- **Live Circuit Flow**: Real-time D3 animation showing medicine distribution
- Source → Distribution Centers → Consumption Points
- Animated flowing particles showing medicine movement
- Dynamic stock level updates
- Product selection (Paracetamol, Insulin, Amoxicillin, Metformin)

### Product Labeling (RL)
- Review and manage products labeled by Reinforcement Learning
- Accept/Reject/Skip actions

### Timeframe Filter
- Date range selector: Today, Yesterday, 7 Days, 30 Days, 90 Days, 12 Months
- Integrated across all analytics components

## Data Structure
Pharmacy-specific hierarchical data:
- **Drug Categories**: Cardiovascular, Pain Management, Antibiotics, etc.
- **Subcategories**: Beta Blockers, Statins, NSAIDs, etc.
- **Types**: Generic, Branded medications
- **Areas**: Hospital zones (A-F)
- **Specialities**: Cardiology, Oncology, Neurology, etc.
- **Wards**: Multiple ward locations per speciality

## Dependencies
- React 18.2.0
- react-scripts 5.0.1
- Tailwind CSS 3.3.0
- Recharts 2.10.3
- D3.js 7.8.5
- Lucide React 0.263.1

## Recent Changes
- December 2, 2025: Hospital Pharma Platform Transformation
  - Implemented authentication flow with Login/Signup pages
  - Removed multi-vertical selector; now Hospital Pharma only
  - Created Overview tab with pharmacy-specific KPIs
  - Built interactive chord diagram with dynamic Area/Speciality/Ward filters
  - Added sparkline KPI graphs for OTIF, Cost Saving, Expiry Duration
  - Implemented Live Circuit Flow animation for Product Journey
  - Generated comprehensive synthetic pharma data
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
- D3 used for chord diagram and circuit flow animations
- Recharts for sparkline KPI visualizations
