#!/bin/bash

echo "🚀 INITIATING AI-OSINT-TOOL DEPLOYMENT PROTOCOL..."

# 1. Backend Setup
echo "🔧 Setting up Backend..."
cd backend
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

source venv/bin/activate || echo "⚠️ Could not activate venv, proceeding with system python..."
pip install -r requirements.txt
cd ..

# 2. Frontend Setup
echo "🎨 Setting up Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing Node dependencies..."
    npm install
fi

echo "🏗️ Building Frontend..."
npm run build
cd ..

echo "✅ DEPLOYMENT PREPARATION COMPLETE."
echo "------------------------------------------------"
echo "To start the system:"
echo "1. Backend: cd backend && python app.py"
echo "2. Frontend: cd frontend && npm run dev (for dev) or serve dist (for prod)"
echo "------------------------------------------------"
