# 📇 MongoDB Contact Manager - Complete CRUD Application

This project demonstrates a complete MongoDB CRUD (Create, Read, Update, Delete) operations implementation with React frontend and Express backend.

## 📋 Project Structure

```
mongodb-contact-manager/
├── Backend/
│   ├── server.js           # Express server with MongoDB integration
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ContactManager.jsx  # Main React component
│   │   │   └── ContactManager.css  # Styling
│   │   ├── App.jsx        # App component
│   │   └── App.css        # App styling
│   ├── public/
│   │   └── index.html
│   └── package.json       # Frontend dependencies
├── mongo-crud-operations.js  # Standalone MongoDB operations script
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (v4.0+)
- npm or yarn

### Installation

#### 1. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Copy the package.json content to your project
npm install express mongodb cors dotenv

# Create .env file
echo "MONGO_URL=mongodb://localhost:27017" > .env

# Start the backend server
npm start
# Server will run on http://localhost:5000
```

#### 2. Setup Frontend

```bash
# Create React app (if not already created)
npx create-react-app contact-manager

cd contact-manager

# Copy the ContactManager.jsx and ContactManager.css files
cp ../ContactManager.jsx src/components/
cp ../ContactManager.css src/components/

# Install axios for API calls
npm install axios

# Start the React development server
npm start
# App will run on http://localhost:3000
```

## 📊 Database Schema

### Collection: contactlist

```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String (optional),
  age: Number,
  createdAt: Date,
  updatedAt: Date (optional)
}
```

### Sample Documents

```javascript
{ lastName: "Ben", firstName: "Moris", email: "ben@gmail.com", age: 26 }
{ lastName: "Kefi", firstName: "Seif", email: "kefi@gmail.com", age: 15 }
{ lastName: "Emilie", firstName: "brouge", email: "emilie.b@gmail.com", age: 40 }
{ lastName: "Alex", firstName: "brown", age: 4 }
{ lastName: "Denzel", firstName: "Washington", age: 3 }
```

## 🔧 API Endpoints

### CREATE
- **POST** `/api/contacts`
  - Body: `{ firstName, lastName, email?, age }`
  - Returns: Created contact with ID

### READ
- **GET** `/api/contacts` - Get all contacts
- **GET** `/api/contacts/:id` - Get single contact by ID
- **GET** `/api/contacts/filter/age-gt-18` - Get contacts aged > 18
- **GET** `/api/contacts/filter/advanced?name=value` - Filter by age > 18 and name

### UPDATE
- **PUT** `/api/contacts/:id` - Update a contact
  - Body: Fields to update
- **PUT** `/api/contacts/update/kefi-seif` - Special update: Kefi Seif → Kefi Anis

### DELETE
- **DELETE** `/api/contacts/:id` - Delete a contact
- **DELETE** `/api/contacts/filter/age-lt-5` - Delete contacts aged < 5

## 📱 React Component Features

The ContactManager component provides:

### View Modes
1. **All Contacts** - Display complete contact list with actions
2. **Single Contact** - View detailed information about one contact
3. **Age Filter** - Show only contacts aged > 18
4. **Advanced Filter** - Filter by age > 18 and name search
5. **Edit Mode** - Create/Update contact information

### Operations

#### Display All Contacts
```javascript
displayAllContacts()
```
Shows all contacts in a responsive table with edit/delete actions.

#### Display Single Contact
```javascript
displaySingleContact(id)
```
Shows detailed view of a specific contact with all information.

#### Filter by Age
```javascript
displayContactsByAge()
```
Displays only contacts older than 18 years.

#### Advanced Filter
```javascript
displayFilteredContacts()
```
Filters contacts where age > 18 AND name contains search text (case-insensitive).

#### Update Contact
```javascript
updateContact(id, updatedData)
```
Updates specific contact information.

#### Update Kefi Seif to Kefi Anis
```javascript
updateKefiSeif()
```
Special operation to change Kefi Seif's first name to Anis.

#### Delete Contacts
```javascript
deleteContact(id)  // Delete specific contact
deleteUnderFive()  // Delete all contacts aged < 5
```

## 🎯 CRUD Operations Demonstration

### 1. CREATE - Insert Documents ✅
```javascript
// Automatically initialized with sample data
const contacts = [
  { lastName: 'Ben', firstName: 'Moris', email: 'ben@gmail.com', age: 26 },
  { lastName: 'Kefi', firstName: 'Seif', email: 'kefi@gmail.com', age: 15 },
  { lastName: 'Emilie', firstName: 'brouge', email: 'emilie.b@gmail.com', age: 40 },
  { lastName: 'Alex', firstName: 'brown', age: 4 },
  { lastName: 'Denzel', firstName: 'Washington', age: 3 }
];
```

### 2. READ - Display All Contacts ✅
```
ID | First Name | Last Name | Email              | Age
1  | Moris      | Ben       | ben@gmail.com      | 26
2  | Seif       | Kefi      | kefi@gmail.com     | 15
3  | brouge     | Emilie    | emilie.b@gmail.com | 40
4  | brown      | Alex      | -                  | 4
5  | Washington | Denzel    | -                  | 3
```

### 3. READ - Single Contact by ID ✅
```
Details for ID #1:
- First Name: Moris
- Last Name: Ben
- Email: ben@gmail.com
- Age: 26
```

### 4. READ - Contacts with Age > 18 ✅
```
ID | First Name | Last Name | Email              | Age
1  | Moris      | Ben       | ben@gmail.com      | 26
3  | brouge     | Emilie    | emilie.b@gmail.com | 40
```

### 5. READ - Age > 18 AND Name Contains "ah" ✅
```
ID | First Name | Last Name | Email
3  | brouge     | Emilie    | emilie.b@gmail.com (contains "ah" in names)
```

### 6. UPDATE - Change Kefi Seif to Kefi Anis ✅
```
Before: { lastName: 'Kefi', firstName: 'Seif', ... }
After:  { lastName: 'Kefi', firstName: 'Anis', ... }
```

### 7. DELETE - Remove Contacts Aged < 5 ✅
```
Deleted records:
- Alex brown (age: 4)
- Denzel Washington (age: 3)
```

### 8. READ - Final Contacts List ✅
```
ID | First Name | Last Name | Email              | Age
1  | Moris      | Ben       | ben@gmail.com      | 26
2  | Seif       | Kefi      | kefi@gmail.com     | 15
3  | brouge     | Emilie    | emilie.b@gmail.com | 40
```

## 🎨 User Interface

The React application features:

### Sidebar Navigation
- **READ Operations**: View all, by ID, age filter, advanced search
- **UPDATE Operations**: Edit contact, update Kefi Seif
- **DELETE Operations**: Delete single, delete under 5

### Main Content Area
- Responsive table with contact data
- Detailed card view for single contacts
- Form for creating/editing contacts
- Filtered results display
- Action buttons for each operation

### Styling Features
- Modern gradient design (purple/violet theme)
- Responsive layout (works on mobile/tablet/desktop)
- Smooth animations and transitions
- Intuitive color coding (Primary, Secondary, Warning, Danger)
- Accessibility features (focus states, labels)

## 📸 Operation Screenshots

To capture screenshots of the application:

1. **Show All Contacts**: Click "View All Contacts" button
2. **View Single Contact**: Enter ID and click "View by ID"
3. **Age Filter**: Click "Age > 18" button
4. **Advanced Filter**: Enter name search and click "Filter" button
5. **Update Operation**: Click "Update: Kefi Seif → Anis" button
6. **Delete Operation**: Click "Delete Age < 5" button
7. **Final View**: Click "View All Contacts" to see final list

## 🛠️ MongoDB Commands (for reference)

```javascript
// Connect to MongoDB
mongo mongodb://localhost:27017

// Select database
use contact

// View collection
db.contactlist.find()

// Find by age > 18
db.contactlist.find({ age: { $gt: 18 } })

// Find by age > 18 AND name contains "ah"
db.contactlist.find({
  age: { $gt: 18 },
  $or: [
    { firstName: { $regex: "ah", $options: "i" } },
    { lastName: { $regex: "ah", $options: "i" } }
  ]
})

// Update Kefi Seif to Kefi Anis
db.contactlist.updateOne(
  { lastName: "Kefi", firstName: "Seif" },
  { $set: { firstName: "Anis" } }
)

// Delete contacts aged < 5
db.contactlist.deleteMany({ age: { $lt: 5 } })
```

## 🔗 Integration with MongoDB

### Option 1: Local MongoDB
1. Install MongoDB Community Edition
2. Run MongoDB service: `mongod`
3. Application will connect to `localhost:27017`

### Option 2: MongoDB Atlas (Cloud)
1. Create account at mongodb.com
2. Create cluster and get connection string
3. Update `.env` file: `MONGO_URL=mongodb+srv://...`

### Option 3: Docker MongoDB
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

## 📚 Technologies Used

### Frontend
- **React 18** - UI library
- **CSS3** - Styling with flexbox and grid
- **JavaScript ES6+** - Modern JavaScript

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **MongoDB Driver** - Native MongoDB client

## 🚦 Status Codes

```
200 - OK (successful request)
201 - Created (successful creation)
400 - Bad Request (invalid data)
404 - Not Found (resource not found)
500 - Server Error (internal error)
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the MIT License.

## 📞 Support

For issues or questions:
1. Check the documentation above
2. Review the code comments
3. Check MongoDB and Express documentation
4. Review React documentation

---

**Happy Coding!** 🎉
