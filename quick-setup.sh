#!/bin/bash

# MongoDB Contact Manager - Quick Start Script
# This script automates the setup process

set -e  # Exit on error

echo "🚀 MongoDB Contact Manager - Quick Setup"
echo "========================================"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo -e "${BLUE}📋 Checking Prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}⚠️  Node.js is not installed!${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found: $(node --version)${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}⚠️  npm is not installed!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm found: $(npm --version)${NC}"

echo ""
echo -e "${BLUE}🏗️  Creating Directory Structure...${NC}"

# Create directories
mkdir -p backend frontend/src/components

echo -e "${GREEN}✓ Directories created${NC}"

echo ""
echo -e "${BLUE}📦 Installing Backend Dependencies...${NC}"

cd backend
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  package.json not found in backend directory${NC}"
    echo "Please ensure server.js and package.json are in the backend directory"
fi

echo ""
echo -e "${BLUE}📦 Installing Frontend Dependencies...${NC}"

cd ../frontend
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo -e "${YELLOW}⚠️  package.json not found in frontend directory${NC}"
    echo "Creating React app..."
    cd ..
    npx create-react-app frontend
    cd frontend
    npm install axios
    echo -e "${GREEN}✓ React app created with axios${NC}"
fi

echo ""
echo -e "${BLUE}🔧 Creating Environment Files...${NC}"

# Backend .env
if [ ! -f "../backend/.env" ]; then
    cat > ../backend/.env << EOF
MONGO_URL=mongodb://localhost:27017
PORT=5000
NODE_ENV=development
EOF
    echo -e "${GREEN}✓ Backend .env created${NC}"
else
    echo -e "${YELLOW}⚠️  Backend .env already exists${NC}"
fi

# Frontend .env
if [ ! -f ".env" ]; then
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
EOF
    echo -e "${GREEN}✓ Frontend .env created${NC}"
else
    echo -e "${YELLOW}⚠️  Frontend .env already exists${NC}"
fi

echo ""
echo -e "${GREEN}✅ Setup Complete!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo ""
echo "1. Make sure MongoDB is running:"
echo -e "   ${YELLOW}macOS:${NC} brew services start mongodb-community"
echo -e "   ${YELLOW}Linux:${NC} sudo systemctl start mongod"
echo -e "   ${YELLOW}Windows:${NC} MongoDB should be running as a service"
echo ""
echo "2. Start the backend server (Terminal 1):"
echo -e "   ${YELLOW}cd backend && npm start${NC}"
echo ""
echo "3. Start the frontend server (Terminal 2):"
echo -e "   ${YELLOW}cd frontend && npm start${NC}"
echo ""
echo "4. Open your browser to: ${BLUE}http://localhost:3000${NC}"
echo ""
echo -e "${BLUE}📚 Documentation:${NC}"
echo "- README.md - Project overview"
echo "- SETUP-DEPLOYMENT-GUIDE.md - Detailed setup instructions"
echo "- CRUD-TEST-GUIDE.md - Testing guide with expected results"
echo ""
echo -e "${GREEN}Happy Coding! 🎉${NC}"
