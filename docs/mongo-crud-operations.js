const { MongoClient, ObjectId } = require('mongodb');

// Connection URL
const MONGO_URL = 'mongodb://localhost:27017';
const DB_NAME = 'contact';
const COLLECTION_NAME = 'contactlist';

async function main() {
  const client = new MongoClient(MONGO_URL);
  
  try {
    // Connect to MongoDB
    await client.connect();
    console.log('✓ Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    const collection = db.collection(COLLECTION_NAME);
    
    // ===== 1. CREATE - Insert documents =====
    console.log('\n========== 1. INSERTING DOCUMENTS ==========');
    const contacts = [
      { lastName: 'Ben', firstName: 'Moris', email: 'ben@gmail.com', age: 26 },
      { lastName: 'Kefi', firstName: 'Seif', email: 'kefi@gmail.com', age: 15 },
      { lastName: 'Emilie', firstName: 'brouge', email: 'emilie.b@gmail.com', age: 40 },
      { lastName: 'Alex', firstName: 'brown', age: 4 },
      { lastName: 'Denzel', firstName: 'Washington', age: 3 }
    ];
    
    const insertResult = await collection.insertMany(contacts);
    console.log(`✓ Inserted ${insertResult.insertedCount} documents`);
    console.log('IDs:', Object.values(insertResult.insertedIds));
    
    // ===== 2. READ - Display all contacts =====
    console.log('\n========== 2. DISPLAY ALL CONTACTS ==========');
    const allContacts = await collection.find({}).toArray();
    console.table(allContacts);
    
    // ===== 3. READ - Display one person by ID =====
    console.log('\n========== 3. DISPLAY ONE CONTACT BY ID ==========');
    const firstId = insertResult.insertedIds[0];
    const oneContact = await collection.findOne({ _id: firstId });
    console.log('Contact with ID', firstId);
    console.table([oneContact]);
    
    // ===== 4. READ - Display contacts with age > 18 =====
    console.log('\n========== 4. CONTACTS WITH AGE > 18 ==========');
    const adultsOnly = await collection.find({ age: { $gt: 18 } }).toArray();
    console.table(adultsOnly);
    
    // ===== 5. READ - Display contacts with age > 18 AND name containing "ah" =====
    console.log('\n========== 5. CONTACTS WITH AGE > 18 AND NAME CONTAINING "ah" ==========');
    const filtered = await collection.find({
      age: { $gt: 18 },
      $or: [
        { firstName: { $regex: 'ah', $options: 'i' } },
        { lastName: { $regex: 'ah', $options: 'i' } }
      ]
    }).toArray();
    console.table(filtered);
    
    // ===== 6. UPDATE - Change Kefi Seif to Kefi Anis =====
    console.log('\n========== 6. UPDATE KEFI SEIF TO KEFI ANIS ==========');
    const updateResult = await collection.updateOne(
      { lastName: 'Kefi', firstName: 'Seif' },
      { $set: { firstName: 'Anis' } }
    );
    console.log(`✓ Modified ${updateResult.modifiedCount} document(s)`);
    const updatedKefi = await collection.findOne({ lastName: 'Kefi' });
    console.table([updatedKefi]);
    
    // ===== 7. DELETE - Remove contacts aged < 5 =====
    console.log('\n========== 7. DELETE CONTACTS WITH AGE < 5 ==========');
    const deleteResult = await collection.deleteMany({ age: { $lt: 5 } });
    console.log(`✓ Deleted ${deleteResult.deletedCount} document(s)`);
    
    // ===== 8. READ - Display all contacts after operations =====
    console.log('\n========== 8. FINAL CONTACTS LIST ==========');
    const finalContacts = await collection.find({}).toArray();
    console.table(finalContacts);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('\n✓ Connection closed');
  }
}

main();
