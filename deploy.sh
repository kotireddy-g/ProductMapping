#!/bin/bash

# ExperienceFlow Multi-Vertical Procurement Platform Deployment Script
# Supports: Hospitality, Supermarket, Hospital Pharma

echo "🚀 Starting ExperienceFlow deployment..."

# Clean previous build
echo "🧹 Cleaning previous build..."
rm -rf build
rm -f product-mapping.zip

# Build the project with correct homepage
echo "📦 Building React project with correct asset paths..."
npm run build

# Verify build was successful
if [ ! -d "build" ]; then
    echo "❌ Build failed! No build directory found."
    exit 1
fi

# Verify assets path (React uses 'build' instead of 'dist')
echo "🔍 Verifying build assets..."
grep "assets" build/index.html
echo "Build verification complete."

# Package and upload
echo "📤 Packaging and uploading..."
cd build
zip -r ../product-mapping.zip .
cd ..

# Upload to server
echo "⬆️ Uploading to server..."
scp product-mapping.zip exflow@192.168.1.111:/tmp/

# Deploy on server
echo "🚀 Deploying on server..."
ssh exflow@192.168.1.111 << 'ENDSSH'
cd /var/www
sudo rm -rf product-mapping/*
sudo mkdir -p product-mapping
sudo unzip -o /tmp/product-mapping.zip -d product-mapping
sudo chown -R www-data:www-data product-mapping
sudo chmod -R 755 product-mapping
rm /tmp/product-mapping.zip
echo "✅ Server deployment complete!"
ENDSSH

# Clean up local zip
echo "🧹 Cleaning up local files..."
rm product-mapping.zip

echo ""
echo "🎉 Deployment Complete!"
echo "✅ Visit: http://192.168.1.111/product-mapping/"
echo ""
echo "🏢 ExperienceFlow Multi-Vertical Platform is now live with:"
echo "   🏨 Hospitality: Hotels, Restaurants & Food Service"
echo "   🛒 Supermarket: Retail Chains & Grocery Stores"  
echo "   🏥 Hospital Pharma: Hospitals & Pharmaceutical Supply"
echo ""
echo "✨ Features:"
echo "   • Multi-vertical procurement intelligence"
echo "   • Interactive chord diagram visualization"
echo "   • Critical insights panel with immediate actions"
echo "   • Product flow tracking across departments"
echo "   • Cross-location analysis and comparison"
echo "   • Executive-ready tooltips and guidance"
echo "   • RLHF (Reinforcement Learning Human Feedback) labeling"
echo ""
