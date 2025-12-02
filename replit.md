# ExperienceFlow Multi-Vertical Procurement Intelligence Platform

## Project Overview
ExperienceFlow is a comprehensive procurement management system supporting multiple verticals including Hospitality, Supermarket, and Hospital Pharma sectors. The platform features product labeling using Reinforcement Learning concepts and provides detailed procurement analytics.

## Project Type
- **Framework**: React 18 with Create React App
- **Build Tool**: react-scripts (webpack-based)
- **Styling**: Tailwind CSS
- **Visualization**: Recharts, D3.js
- **Icons**: Lucide React

## Current State
- **Status**: Fully configured and running in Replit environment
- **Last Updated**: December 2, 2025
- **Environment**: Development server running on port 5000

## Project Structure
```
src/
├── components/          # React components
│   ├── BouncingBubbles.js
│   ├── DetailDrawer.js
│   ├── FilterPanel.js
│   ├── OverviewTab.js
│   ├── PerformanceMetrics.js
│   ├── ProductJourney.js
│   ├── ProductLabelingPanel.js
│   └── SearchBar.js
├── data/               # Mock data and synthetic data
│   ├── mockData.js
│   ├── syntheticChordData.js
│   └── verticalData.js
├── App.js             # Main application component
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
1. **Product Journey Tab**: Track product consumption with performance metrics across multiple timeframes
2. **Overview Tab**: Multi-vertical procurement intelligence with chord diagrams
3. **Product Labeling (RL)**: Review and manage products labeled by Reinforcement Learning
4. **Bouncing Bubbles**: Interactive animated visualization of product performance
5. **Detail Drawer**: Comprehensive product analysis with trend charts

## Supported Verticals
1. **Hospitality**: Hotels, restaurants, catering
2. **Supermarket**: Retail grocery operations
3. **Hospital Pharma**: Hospital pharmaceutical procurement

## Dependencies
- React 18.2.0
- react-scripts 5.0.1
- Tailwind CSS 3.3.0
- Recharts 2.10.3
- D3.js 7.8.5
- Lucide React 0.263.1

## Known Issues
- Minor ESLint warnings for unused imports (non-critical)
- Some React Hook dependency warnings (functionality not affected)

## Recent Changes
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
- D3 used for chord diagrams, Recharts for other visualizations
