#!/bin/bash

# ProductMapping Deployment Script
# Based on your previous epa-project deployment pattern

echo "🚀 Starting ProductMapping deployment..."

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
echo "📊 Your ProductMapping dashboard is now live with:"
echo "   • Interactive chord diagram visualization"
echo "   • Critical insights panel"
echo "   • Product flow tracking"
echo "   • Cross-location analysis"
echo "   • Executive-ready tooltips"
echo ""
