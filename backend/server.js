const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = 'contact';
const COLLECTION_NAME = 'contactlist';

let db;
let contactsCollection;

// Connect to MongoDB
async function connectDB() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    contactsCollection = db.collection(COLLECTION_NAME);
    
    // Initialize with sample data if empty
    const count = await contactsCollection.countDocuments();
    if (count === 0) {
      await initializeSampleData();
    }
    
    console.log('✓ Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Initialize sample data
async function initializeSampleData() {
  const sampleContacts = [
    { lastName: 'Ben', firstName: 'Moris', email: 'ben@gmail.com', age: 26, createdAt: new Date() },
    { lastName: 'Kefi', firstName: 'Seif', email: 'kefi@gmail.com', age: 15, createdAt: new Date() },
    { lastName: 'Emilie', firstName: 'brouge', email: 'emilie.b@gmail.com', age: 40, createdAt: new Date() },
    { lastName: 'Alex', firstName: 'brown', age: 4, createdAt: new Date() },
    { lastName: 'Denzel', firstName: 'Washington', age: 3, createdAt: new Date() }
  ];
  
  await contactsCollection.insertMany(sampleContacts);
  console.log('✓ Sample data inserted');
}

// ===== CREATE - Add a new contact =====
app.post('/api/contacts', async (req, res) => {
  try {
    const contact = {
      ...req.body,
      createdAt: new Date()
    };
    const result = await contactsCollection.insertOne(contact);
    res.status(201).json({
      success: true,
      message: 'Contact created successfully',
      data: { _id: result.insertedId, ...contact }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== READ - Get all contacts =====
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await contactsCollection.find({}).toArray();
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== READ - Get single contact by ID =====
app.get('/api/contacts/:id', async (req, res) => {
  try {
    const contact = await contactsCollection.findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (!contact) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== READ - Get contacts with age > 18 =====
app.get('/api/contacts/filter/age-gt-18', async (req, res) => {
  try {
    const contacts = await contactsCollection.find({ age: { $gt: 18 } }).toArray();
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== READ - Get contacts with age > 18 AND name containing text =====
app.get('/api/contacts/filter/advanced', async (req, res) => {
  try {
    const { name } = req.query;
    const filter = {
      age: { $gt: 18 },
      $or: [
        { firstName: { $regex: name || '', $options: 'i' } },
        { lastName: { $regex: name || '', $options: 'i' } }
      ]
    };
    
    const contacts = await contactsCollection.find(filter).toArray();
    res.json({
      success: true,
      count: contacts.length,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== UPDATE - Update a contact =====
app.put('/api/contacts/:id', async (req, res) => {
  try {
    const result = await contactsCollection.updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { ...req.body, updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    const updatedContact = await contactsCollection.findOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    res.json({
      success: true,
      message: 'Contact updated successfully',
      data: updatedContact
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== UPDATE - Specific: Change Kefi Seif to Kefi Anis =====
app.put('/api/contacts/update/kefi-seif', async (req, res) => {
  try {
    const result = await contactsCollection.updateOne(
      { lastName: 'Kefi', firstName: 'Seif' },
      { $set: { firstName: 'Anis', updatedAt: new Date() } }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    const updatedContact = await contactsCollection.findOne({ 
      lastName: 'Kefi', firstName: 'Anis'
    });
    
    res.json({
      success: true,
      message: 'Kefi Seif updated to Kefi Anis',
      data: updatedContact
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== DELETE - Delete a contact =====
app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const result = await contactsCollection.deleteOne({ 
      _id: new ObjectId(req.params.id) 
    });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Contact not found' });
    }
    
    res.json({
      success: true,
      message: 'Contact deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ===== DELETE - Delete all contacts aged < 5 =====
app.delete('/api/contacts/filter/age-lt-5', async (req, res) => {
  try {
    const result = await contactsCollection.deleteMany({ age: { $lt: 5 } });
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} contact(s) aged under 5`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
  });
});
