# Hospital Pharma Procurement Intelligence Platform

## Project Overview
A specialized procurement intelligence platform for Hospital Pharmacy operations featuring label-based navigation, RCA (Root Cause Analysis) with AI recommendations, enhanced product journey visualization, and vendor forecast capabilities. The platform provides context-aware procurement insights across 10 label categories with a three-screen navigation architecture.

## Project Type
- **Framework**: React 18 with Create React App
- **Build Tool**: react-scripts (webpack-based)
- **Styling**: Tailwind CSS with custom animations
- **Visualization**: Recharts, D3.js (chord diagram, circuit flow animation)
- **Icons**: Lucide React

## Current State
- **Status**: Fully configured and running in Replit environment
- **Last Updated**: December 3, 2025
- **Environment**: Development server running on port 5000
- **Authentication**: Implemented (Login/Signup with form validation)

## Three-Screen Navigation Architecture

### First Screen: Label Dashboard
- 10 label cards with color-coded severity (Red/Yellow/Green)
- Labels: Over-Stocking, Under-Stocking, Expiry Risk, Wastage, Dead Stock, Stockout Risk, High Velocity, Slow Moving, Emergency Shortage, Cost Overrun
- Each card shows: health score, trend indicator, weekly history chart
- Click on card navigates to Second Screen with context

### Second Screen: Label-Specific Dashboard
- Global search bar with autocomplete
- Clickable label keyword chips for quick context switching
- Three tabs: Overview, Product Journey, Product Improvement
- **Overview Tab**:
  - Chord Diagram with dynamic filters (Area/Speciality/Ward)
  - Categories & Functions section
  - Vendor List with horizontal scroll
  - Label-Specific KPIs with drawer interaction
- **Product Journey Tab**: 5-level circuit flow animation
- **Product Improvement Tab**: Product review and approval system

### Third Screen: RCA & Recommendations
- Dark theme (#1e293b background)
- Product selector dropdown
- Decision summary cards
- Counterfactual scenarios table
- Human feedback loop timeline
- Policy health metrics
- RCA key drivers horizontal bar chart
- Accept/Modify/Reject action buttons

## Project Structure
```
src/
├── components/
│   ├── Auth/                      # Authentication components
│   │   ├── Login.js              # Login page with form validation
│   │   └── Signup.js             # Signup page with password requirements
│   ├── FirstScreen/              # Label Dashboard (1st screen)
│   │   ├── LabelDashboard.js     # Main container with grid layout
│   │   └── LabelCard.js          # Individual label card component
│   ├── SecondScreen/             # Label-Specific Dashboard (2nd screen)
│   │   ├── SecondScreenDashboard.js  # Main container with tabs
│   │   ├── GlobalSearch.js       # Search bar with label chips
│   │   ├── CategoriesSection.js  # Categories & Functions grid
│   │   ├── VendorList.js         # Horizontal vendor cards
│   │   ├── LabelKPIs.js          # 4 KPIs with drawer interaction
│   │   ├── EnhancedCircuitFlow.js # 5-level circuit flow animation
│   │   └── ProductImprovement.js  # Product review system
│   ├── ThirdScreen/              # RCA & Recommendations (3rd screen)
│   │   └── RCAScreen.js          # Full RCA interface
│   ├── VendorForecast/           # Vendor Forecast modal
│   │   └── ForecastModal.js      # Data table with 12+ columns
│   ├── Overview/                 # Overview tab components
│   │   └── PharmaChodDiagram.js  # D3 chord diagram with filters
│   └── DetailDrawer.js           # Product detail drawer
├── data/
│   ├── labelData.js              # 10 labels with synthetic data
│   ├── rcaData.js                # RCA scenarios and recommendations
│   ├── vendorForecastData.js     # Vendor forecast data
│   ├── pharmaChordData.js        # Chord diagram data
│   └── syntheticChordData.js     # Synthetic data generators
├── App.js                        # Main app with screen routing
├── index.css                     # Global styles with animations
└── index.js                      # Entry point
```

## Features

### Label Categories (10 Types)
1. **Over-Stocking** (Yellow) - Excess inventory alerts
2. **Under-Stocking** (Red) - Low stock warnings
3. **Expiry Risk** (Red) - Medication expiry alerts
4. **Wastage** (Orange) - Waste management insights
5. **Dead Stock** (Red) - Non-moving inventory
6. **Stockout Risk** (Red) - Critical stock alerts
7. **High Velocity** (Green) - Fast-moving products
8. **Slow Moving** (Yellow) - Low turnover items
9. **Emergency Shortage** (Red) - Critical shortages
10. **Cost Overrun** (Yellow) - Budget overruns

### Chord Diagram
- Uniform blue color for left-side medicine categories
- Ribbon color indicates movement speed:
  - Green: Fast movement
  - Yellow: Medium movement
  - Orange: Slow movement
  - Red: Occasional movement
- Ribbon thickness indicates consumption level
- Click on ribbon navigates to RCA screen

### 5-Level Circuit Flow
1. Product (source)
2. Distribution Centers
3. Usage Points
4. Stock Locations
5. Consumption Points

### Vendor Forecast Modal
- Accessible from header "Vendor Forecast" button
- Full data table with 12+ columns
- Sortable and filterable
- Pagination
- Summary cards
- Expandable rows with details

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

## Dependencies
- React 18.2.0
- react-scripts 5.0.1
- Tailwind CSS 3.3.0
- Recharts 2.10.3
- D3.js 7.8.5
- Lucide React 0.263.1

## Recent Changes
- December 3, 2025: Comprehensive Platform Enhancement
  - Implemented three-screen navigation architecture
  - Created Label Dashboard with 10 color-coded label cards
  - Built Second Screen with Global Search, tabs, and context-aware data
  - Updated Chord Diagram with uniform left colors, ribbon color = movement speed
  - Added Categories & Functions section with variance tracking
  - Created Vendor List with horizontal scrolling cards
  - Implemented Label-Specific KPIs with drawer interaction
  - Built RCA Screen with dark theme and AI recommendations
  - Enhanced Circuit Flow with 5 levels and slower particle animation
  - Created Vendor Forecast modal with comprehensive data table
  - Renamed Product Labeling to Product Improvement
  - Generated comprehensive synthetic data for all features
  - Added CSS animations for smooth transitions

- December 2, 2025: Initial Replit environment setup
  - Configured port 5000 for frontend
  - Set up environment variables for Replit compatibility
  - Configured workflow for development server
  - Set up static deployment configuration

## Development
- **Start Dev Server**: `npm start` (runs on port 5000)
- **Build**: `npm run build`
- **Test**: `npm test`

## Architecture Notes
- Uses Create React App (CRA) - no custom webpack configuration
- Synthetic data is used throughout (no backend/API integration)
- State management is handled via React hooks (no Redux)
- Tailwind CSS with PostCSS for styling
- D3 used for chord diagram and circuit flow animations
- Recharts for sparkline KPI visualizations
- Three-screen navigation managed via App.js state