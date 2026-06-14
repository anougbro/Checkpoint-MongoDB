# 🚀 MongoDB Contact Manager - Quick Start

## 📋 Prerequisites

- Node.js v14+ 
- MongoDB v4.0+
- npm v6+

## ⚡ 5-Minute Setup

### Step 1: Install MongoDB

**macOS:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Windows/Linux:**
- Download from [mongodb.com](https://www.mongodb.com/try/download/community)
- Install and start the service

### Step 2: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 3: Install Frontend Dependencies

```bash
cd frontend
npm install
```

### Step 4: Start Backend (Terminal 1)

```bash
cd backend
npm start
```

Expected output:
```
✓ Connected to MongoDB
✓ Sample data inserted
✓ Server running on http://localhost:5000
```

### Step 5: Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

Expected output:
```
Compiled successfully!
Local: http://localhost:3000
```

### Step 6: Open Application

Open your browser and go to:
```
http://localhost:3000
```

## ✅ Test Operations

### 1. View All Contacts
- Click "View All Contacts"
- Should show 5 contacts

### 2. Filter by Age
- Click "Age > 18"
- Should show 2 contacts (Moris: 26, Emilie: 40)

### 3. Update Contact
- Click "Update: Kefi Seif → Anis"
- Kefi's first name changes to Anis

### 4. Delete Contacts
- Click "Delete Age < 5"
- Alex (4) and Denzel (3) are removed

### 5. Final Check
- Click "View All Contacts"
- Should now show 3 contacts

## 📚 Documentation

- `docs/README.md` - Full project documentation
- `docs/SETUP-DEPLOYMENT-GUIDE.md` - Detailed setup instructions
- `docs/CRUD-TEST-GUIDE.md` - Complete testing guide
- `docs/PROJECT-SUMMARY.md` - Project overview

## 🔧 Environment Variables

### Backend (.env in backend folder)
```
MONGO_URL=mongodb://localhost:27017
PORT=5000
NODE_ENV=development
```

### Frontend (.env in frontend folder)
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

## 🆘 Troubleshooting

### MongoDB Not Running
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Port Already in Use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 [PID]
```

### Dependencies Missing
```bash
# Reinstall in backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Reinstall in frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## 📊 Project Structure

```
mongodb-contact-manager/
├── backend/                 # Express API server
│   ├── server.js
│   ├── package.json
│   └── .env
├── frontend/               # React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactManager.jsx
│   │   │   └── ContactManager.css
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
└── docs/                   # Documentation
    ├── README.md
    ├── SETUP-DEPLOYMENT-GUIDE.md
    ├── CRUD-TEST-GUIDE.md
    └── PROJECT-SUMMARY.md
```

## 🎯 API Endpoints

```
GET    /api/contacts                    - Get all contacts
GET    /api/contacts/:id                - Get single contact
GET    /api/contacts/filter/age-gt-18   - Get adults
GET    /api/contacts/filter/advanced    - Advanced search
POST   /api/contacts                    - Create contact
PUT    /api/contacts/:id                - Update contact
PUT    /api/contacts/update/kefi-seif   - Special update
DELETE /api/contacts/:id                - Delete contact
DELETE /api/contacts/filter/age-lt-5    - Delete under 5
```

## 💡 Features

✅ Complete CRUD Operations
✅ MongoDB Integration
✅ Responsive React UI
✅ Express API
✅ Error Handling
✅ Professional Styling
✅ Full Documentation

## 🎉 Ready to Go!

You're all set! The application is fully functional and ready to use.

For more information, check the documentation files in the `docs` folder.

**Happy Coding!** 🚀
