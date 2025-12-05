# ExperienceFlow Procurement Intelligence Platform

## Overview
ExperienceFlow is a comprehensive multi-vertical procurement intelligence platform supporting Hospitality, Supermarket, and Hospital Pharma sectors. The application features advanced product tracking, performance analytics, and an AI-powered product labeling system using Reinforcement Learning (RLHF).

## Project Status
- **Current State**: Fully functional React application running in Replit environment
- **Last Updated**: December 5, 2024
- **Imported From**: GitHub repository

## Technology Stack
- **Frontend Framework**: React 18.2.0
- **Build Tool**: Create React App (react-scripts 5.0.1)
- **Styling**: Tailwind CSS 3.3.0
- **Charts & Visualization**: 
  - Recharts 2.10.3
  - D3.js 7.8.5
- **Icons**: Lucide React 0.263.1
- **CSS Processing**: PostCSS 8.4.31, Autoprefixer 10.4.16

## Project Architecture

### Directory Structure
```
src/
├── components/          # React components organized by feature
│   ├── Auth/           # Login and Signup components
│   ├── FirstScreen/    # Label Dashboard and Cards
│   ├── ForecastReview/ # Forecast adjustment and review
│   ├── Notifications/  # Notification Bell and Toast
│   ├── Overview/       # KPI sections and consumption stats
│   ├── ProductJourney/ # Live circuit flow visualization
│   ├── SecondScreen/   # Enhanced dashboards and diagrams
│   ├── ThirdScreen/    # RCA (Root Cause Analysis) screen
│   ├── Upload/         # Upload modal
│   └── VendorForecast/ # Forecast modal for vendors
├── data/               # Mock data and synthetic datasets
├── utils/              # Utility functions (color schemes, etc.)
├── App.js             # Main application component
├── index.js           # Entry point
└── index.css          # Global styles with Tailwind
```

### Key Features
1. **Product Journey Tracking**: Global search, advanced filtering, performance metrics across multiple timeframes
2. **Bouncing Bubbles Visualization**: Interactive animated status indicators
3. **Detail Analysis Drawer**: Comprehensive product performance with trend graphs
4. **RL-Powered Product Labeling**: AI-suggested labels with confidence scores
5. **Multi-Vertical Support**: Hospitality, Supermarket, and Hospital Pharma
6. **Performance Metrics**: Hourly, Daily, Weekly, Monthly, Quarterly, Yearly tracking

## Replit Configuration

### Environment Variables (Development)
- `PORT`: 5000 (required for Replit webview)
- `HOST`: 0.0.0.0 (binds to all interfaces)
- `DANGEROUSLY_DISABLE_HOST_CHECK`: true (allows Replit proxy)

### Workflow
- **Name**: Start application
- **Command**: `npm start`
- **Port**: 5000
- **Output Type**: webview (displays in Replit preview)

### Deployment Configuration
- **Type**: static
- **Build Command**: `npm run build`
- **Public Directory**: build
- **Homepage**: /product-mapping

## Development

### Running Locally
The application is configured to run automatically in Replit. The workflow "Start application" starts the development server on port 5000.

### Scripts
- `npm start` - Start development server (configured for port 5000)
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Known ESLint Warnings
The application compiles successfully with some ESLint warnings for:
- Unused imports and variables
- Missing useEffect dependencies
- Anonymous default exports

These are non-critical and don't affect functionality.

## Data & Visualizations

### Mock Data Includes
- 20 products across 8 categories
- 8 hospitality locations
- 10 RL-labeled products with various statuses
- Synthetic data for chord diagrams, KPI trends, and forecasting

### Color Coding System
- **Green**: Normal consumption (80-120% of expected)
- **Yellow**: Under-consumed (below 80% of expected)
- **Red**: Over-consumed (above 120% of expected)

## Recent Changes
- **December 5, 2024**: Initial import and Replit environment setup
  - Installed all npm dependencies
  - Configured environment variables for Replit
  - Set up workflow for development server on port 5000
  - Configured static deployment with build output
  - Verified application running with login screen

## User Preferences
None documented yet.

## Future Enhancements
- Real-time data integration (currently using mock data)
- Advanced analytics and reporting
- Multi-user collaboration features
- Custom alert thresholds
- Export functionality
- Mobile app version
- API integration with POS systems

## Support & Documentation
See the following files for additional information:
- `README.md` - Project overview and features
- `QUICK_START.md` - Getting started guide
- `FEATURES.md` - Detailed feature documentation
- `API_SPECIFICATIONS.md` - API documentation
- `SETUP.md` - Installation and deployment guide
