#!/bin/bash

echo "🚀 GeoAssist - Quick Start Script"
echo "=================================="

# Check if .env exists
if [ ! -f "server/.env" ]; then
    echo "❌ .env file not found!"
    echo "📝 Creating .env from .env.example..."
    cp server/.env.example server/.env
    echo "⚠️  Please update server/.env with your actual values"
    exit 1
fi

# Check if MongoDB is running
if ! pgrep -x "mongod" > /dev/null; then
    echo "⚠️  MongoDB is not running!"
    echo "Starting MongoDB..."
    mongod --dbpath ~/data/db &
    sleep 3
fi

# Install dependencies
echo "📦 Installing dependencies..."
cd server
npm install

# Generate secrets if needed
echo "🔐 Checking secrets..."
if ! grep -q "JWT_SECRET=.*[a-f0-9]\{32,\}" .env; then
    echo "Generating JWT_SECRET..."
    JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    sed -i "s/JWT_SECRET=.*/JWT_SECRET=$JWT_SECRET/" .env
fi

if ! grep -q "CSRF_SECRET=.*[a-f0-9]\{32,\}" .env; then
    echo "Generating CSRF_SECRET..."
    CSRF_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
    sed -i "s/CSRF_SECRET=.*/CSRF_SECRET=$CSRF_SECRET/" .env
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🎯 Starting server..."
npm start
