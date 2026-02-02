#!/bin/bash

# Quick Deployment Script for akashrathaur.me
# This script helps you deploy your portfolio to various platforms

echo "🚀 Portfolio Deployment Helper"
echo "================================"
echo ""
echo "Choose your deployment platform:"
echo "1) Vercel (Recommended)"
echo "2) Netlify"
echo "3) GitHub Pages"
echo "4) Test Locally"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
  1)
    echo ""
    echo "📦 Deploying to Vercel..."
    echo ""
    echo "Installing Vercel CLI (if not installed)..."
    npm install -g vercel
    echo ""
    echo "Starting deployment..."
    vercel
    echo ""
    echo "✅ Deployment initiated!"
    echo "📝 Next steps:"
    echo "   1. Follow the prompts in your terminal"
    echo "   2. Go to vercel.com dashboard"
    echo "   3. Add custom domain: akashrathaur.me"
    echo "   4. Configure DNS as shown in DEPLOYMENT.md"
    ;;
  
  2)
    echo ""
    echo "📦 Deploying to Netlify..."
    echo ""
    echo "Installing Netlify CLI (if not installed)..."
    npm install -g netlify-cli
    echo ""
    echo "Starting deployment..."
    netlify deploy
    echo ""
    echo "✅ Deployment initiated!"
    echo "📝 Next steps:"
    echo "   1. Follow the prompts in your terminal"
    echo "   2. Go to netlify.com dashboard"
    echo "   3. Add custom domain: akashrathaur.me"
    echo "   4. Configure DNS as shown in DEPLOYMENT.md"
    ;;
  
  3)
    echo ""
    echo "📦 Setting up GitHub Pages..."
    echo ""
    read -p "Enter your GitHub username: " username
    echo ""
    echo "Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Portfolio website"
    git branch -M main
    echo ""
    echo "📝 Next steps:"
    echo "   1. Create a new repository on GitHub"
    echo "   2. Run: git remote add origin https://github.com/$username/portfolio.git"
    echo "   3. Run: git push -u origin main"
    echo "   4. Enable GitHub Pages in repository settings"
    echo "   5. Add custom domain: akashrathaur.me"
    echo "   6. Configure DNS as shown in DEPLOYMENT.md"
    ;;
  
  4)
    echo ""
    echo "🧪 Starting local development server..."
    echo ""
    echo "Portfolio: http://localhost:8000"
    echo "Admin Panel: http://localhost:8000/admin"
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    python3 -m http.server 8000
    ;;
  
  *)
    echo ""
    echo "❌ Invalid choice. Please run the script again."
    exit 1
    ;;
esac
