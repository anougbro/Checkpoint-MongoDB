# 🚀 Complete Setup & Deployment Guide

## MongoDB Contact Manager - Full Stack Application

This guide walks you through setting up and running the complete CRUD application with React frontend and Express backend.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [MongoDB Setup](#mongodb-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Testing the Operations](#testing-the-operations)
7. [Troubleshooting](#troubleshooting)
8. [Deployment](#deployment)

---

## 📦 Prerequisites

### System Requirements
- Node.js v14+ ([Download](https://nodejs.org/))
- npm v6+ or yarn v1.22+
- MongoDB v4.0+ ([Download](https://www.mongodb.com/try/download/community))
- Git (optional)
- Text Editor (VS Code recommended)

### Verify Installation
```bash
# Check Node.js
node --version
# Output: v14.0.0 (or higher)

# Check npm
npm --version
# Output: 6.0.0 (or higher)

# Check MongoDB (if installed locally)
mongod --version
# Output: db version v4.0.0 (or higher)
```

---

## 🗄️ MongoDB Setup

### Option 1: Local MongoDB Installation (Recommended for Development)

#### macOS (using Homebrew)
```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB service
brew services start mongodb-community

# Verify it's running
mongo --version
```

#### Windows
1. Download MongoDB Community Edition from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the installation wizard
3. MongoDB will be installed as a Windows service and start automatically

#### Linux (Ubuntu/Debian)
```bash
# Add MongoDB repository
wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list

# Install MongoDB
apt-get update
apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
```

#### Verify MongoDB is Running
```bash
# Connect to MongoDB shell
mongosh
# or older version
mongo

# You should see a MongoDB prompt
# Type: exit to quit
```

### Option 2: MongoDB Atlas (Cloud - Recommended for Production)

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Create a Database"
   - Choose "Shared" (free tier)
   - Select your region
   - Click "Create Cluster"

3. **Get Connection String**
   - Go to "Connect" button
   - Select "Connect your application"
   - Copy the connection string
   - Replace `<username>` and `<password>`

4. **Update `.env` file**
   ```
   MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/contact
   ```

### Option 3: Docker (Advanced)

```bash
# Pull and run MongoDB container
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Verify it's running
docker ps

# To stop
docker stop mongodb
```

---

## 🎯 Backend Setup

### Step 1: Create Backend Directory
```bash
mkdir mongodb-contact-manager
cd mongodb-contact-manager
mkdir backend
cd backend
```

### Step 2: Initialize Node Project
```bash
npm init -y
```

### Step 3: Install Dependencies
```bash
npm install express mongodb cors dotenv
npm install --save-dev nodemon
```

### Step 4: Copy Server Files
Copy the following files to the `backend` directory:
- `server.js` (from the provided files)
- `package.json` (use the provided one)

### Step 5: Create Environment File
```bash
# Create .env file
cat > .env << EOF
MONGO_URL=mongodb://localhost:27017
PORT=5000
NODE_ENV=development
EOF
```

### Step 6: Test Backend
```bash
# Start the server
npm start

# Expected output:
# ✓ Connected to MongoDB
# ✓ Sample data inserted
# ✓ Server running on http://localhost:5000
```

### Step 7: Test API Endpoints
```bash
# In a new terminal, test the API
curl http://localhost:5000/api/contacts

# You should see JSON array of 5 contacts
```

---

## ⚛️ Frontend Setup

### Step 1: Create React App
```bash
# Go back to main directory
cd ..

# Create React app
npx create-react-app frontend
cd frontend
```

### Step 2: Install Additional Dependencies
```bash
npm install axios
```

### Step 3: Create Component Files
Create the following directory structure:
```
frontend/src/
├── components/
│   ├── ContactManager.jsx
│   └── ContactManager.css
├── App.jsx (replace default)
├── App.css
└── index.js (keep default)
```

### Step 4: Copy Files
1. Copy `ContactManager-with-API.jsx` → `src/components/ContactManager.jsx`
2. Copy `ContactManager.css` → `src/components/ContactManager.css`
3. Update `src/App.jsx` with provided content
4. Update `src/App.css` (can be empty or add custom styles)

### Step 5: Create Environment File
```bash
# In frontend directory
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
EOF
```

### Step 6: Update package.json (optional)
```json
{
  "proxy": "http://localhost:5000",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "dev": "cross-env PORT=3000 react-scripts start"
  }
}
```

---

## 🏃 Running the Application

### Terminal 1: Start MongoDB (if local)
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
# MongoDB starts automatically as a service
```

### Terminal 2: Start Backend Server
```bash
cd backend
npm start

# Expected output:
# ✓ Connected to MongoDB
# ✓ Server running on http://localhost:5000
```

### Terminal 3: Start React Frontend
```bash
cd frontend
npm start

# Expected output:
# Compiled successfully!
# You can now view frontend in the browser.
# Local: http://localhost:3000
```

### Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

---

## 🧪 Testing the Operations

### Test Sequence

#### 1. View All Contacts
- Click "View All Contacts" button
- Should display 5 contacts in a table
- Screenshot: Capture the table

#### 2. View Single Contact
- Enter an ID from the displayed list
- Click "View by ID" button
- Should show detailed card view
- Screenshot: Capture the card

#### 3. Filter by Age
- Click "Age > 18" button
- Should display 2 contacts (Moris - 26, Emilie - 40)
- Screenshot: Capture filtered results

#### 4. Advanced Filter
- Enter "ah" in search box
- Click "Filter" button
- Screenshot: Capture results

#### 5. Update Contact
- Click "Update: Kefi Seif → Anis" button
- Verify first name changed to "Anis"
- Screenshot: Capture updated record

#### 6. Delete Under 5
- Click "Delete Age < 5" button
- Confirm deletion
- Should remove 2 contacts
- Screenshot: Capture confirmation

#### 7. View Final List
- Click "View All Contacts"
- Should now display 3 contacts only
- Screenshot: Capture final list

### Using API Tests (cURL)

```bash
# Get all contacts
curl http://localhost:5000/api/contacts

# Get single contact (use actual ID from previous response)
curl http://localhost:5000/api/contacts/[MONGODB_ID]

# Get contacts aged > 18
curl http://localhost:5000/api/contacts/filter/age-gt-18

# Advanced filter
curl "http://localhost:5000/api/contacts/filter/advanced?name=emilie"

# Create new contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","age":25}'

# Update Kefi Seif
curl -X PUT http://localhost:5000/api/contacts/update/kefi-seif

# Delete single contact
curl -X DELETE http://localhost:5000/api/contacts/[MONGODB_ID]

# Delete all under 5
curl -X DELETE http://localhost:5000/api/contacts/filter/age-lt-5
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error**: `connect ECONNREFUSED 127.0.0.1:27017`

**Solutions**:
```bash
# 1. Check if MongoDB is running
mongo --version

# 2. Start MongoDB service
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# 3. Check MongoDB logs
# macOS
brew services log mongodb-community

# 4. Try alternative connection
# In .env, try:
MONGO_URL=mongodb://127.0.0.1:27017
```

### Port Already in Use

**Error**: `Port 5000 is already in use` or `Port 3000 is already in use`

**Solutions**:
```bash
# Find process using port
# macOS/Linux
lsof -i :5000
lsof -i :3000

# Kill process
kill -9 [PID]

# Or use different ports
# Change in backend .env:
PORT=5001

# Change in frontend:
PORT=3001 npm start
```

### CORS Issues

**Error**: `Access to XMLHttpRequest blocked by CORS policy`

**Solution**: Update backend `server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### React App Issues

**Error**: `Module not found: Can't resolve 'axios'`

**Solution**:
```bash
npm install axios
```

**Error**: `ReactDOM.render is no longer supported`

**Solution**: Update `src/index.js` for React 18:
```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## 📦 Project Structure

```
mongodb-contact-manager/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactManager.jsx
│   │   │   └── ContactManager.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── .env
├── README.md
├── CRUD-TEST-GUIDE.md
└── SETUP-GUIDE.md
```

---

## 🌐 Deployment

### Deploy Backend (Heroku)

1. **Create Heroku Account**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Deploy**
   ```bash
   cd backend
   heroku create contact-manager-api
   git push heroku main
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set MONGO_URL=mongodb+srv://...
   ```

### Deploy Frontend (Netlify)

1. **Build**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy**
   ```bash
   npm install -g netlify-cli
   netlify deploy
   ```

3. **Update API URL**
   ```
   REACT_APP_API_URL=https://contact-manager-api.herokuapp.com/api
   ```

### Docker Deployment

Create `Dockerfile` in backend:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t contact-manager-api .
docker run -p 5000:5000 -e MONGO_URL=mongodb://... contact-manager-api
```

---

## ✅ Verification Checklist

- [ ] MongoDB is installed and running
- [ ] Backend dependencies installed
- [ ] Backend server starts without errors
- [ ] API endpoints respond correctly
- [ ] React app dependencies installed
- [ ] React app compiles successfully
- [ ] Both servers running on correct ports
- [ ] Can access app at http://localhost:3000
- [ ] All 5 contacts display initially
- [ ] All CRUD operations work correctly
- [ ] Update operation changes data
- [ ] Delete operation removes records
- [ ] Final list shows 3 contacts

---

## 📚 Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [RESTful API Best Practices](https://restfulapi.net/)

---

## 🎓 Learning Outcomes

After completing this project, you'll understand:

1. ✅ MongoDB CRUD operations
2. ✅ Express.js API development
3. ✅ React component lifecycle
4. ✅ API integration with axios
5. ✅ RESTful API design
6. ✅ State management in React
7. ✅ Full-stack web development
8. ✅ Database operations

---

## 📧 Support

For help:
1. Check the README.md
2. Review CRUD-TEST-GUIDE.md
3. Check error messages carefully
4. Review code comments
5. Check MongoDB and Express documentation

---

**Happy Coding! 🚀**

Last Updated: 2024
Version: 1.0
