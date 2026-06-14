# MongoDB CRUD Operations - Test Guide & Expected Results

## 📋 Initial Database State

After creation and insertion of documents, the `contact.contactlist` collection contains:

```
{
  _id: ObjectId("..."),
  lastName: "Ben",
  firstName: "Moris",
  email: "ben@gmail.com",
  age: 26
},
{
  _id: ObjectId("..."),
  lastName: "Kefi",
  firstName: "Seif",
  email: "kefi@gmail.com",
  age: 15
},
{
  _id: ObjectId("..."),
  lastName: "Emilie",
  firstName: "brouge",
  email: "emilie.b@gmail.com",
  age: 40
},
{
  _id: ObjectId("..."),
  lastName: "Alex",
  firstName: "brown",
  age: 4
},
{
  _id: ObjectId("..."),
  lastName: "Denzel",
  firstName: "Washington",
  age: 3
}
```

## ✅ OPERATION 1: CREATE - Insert Documents

### Command:
```javascript
db.contactlist.insertMany([
  { lastName: 'Ben', firstName: 'Moris', email: 'ben@gmail.com', age: 26 },
  { lastName: 'Kefi', firstName: 'Seif', email: 'kefi@gmail.com', age: 15 },
  { lastName: 'Emilie', firstName: 'brouge', email: 'emilie.b@gmail.com', age: 40 },
  { lastName: 'Alex', firstName: 'brown', age: 4 },
  { lastName: 'Denzel', firstName: 'Washington', age: 3 }
])
```

### Expected Result:
```
{
  "acknowledged": true,
  "insertedIds": {
    "0": ObjectId("..."),
    "1": ObjectId("..."),
    "2": ObjectId("..."),
    "3": ObjectId("..."),
    "4": ObjectId("...")
  }
}
```

### Screenshot Info:
- Show 5 documents inserted successfully
- Display total count: 5 contacts

---

## ✅ OPERATION 2: READ - Display All Contacts

### Command:
```javascript
db.contactlist.find({})
```

### Expected Result Table:
```
| # | First Name | Last Name | Email              | Age |
|---|-----------|-----------|------------------|-----|
| 1 | Moris     | Ben       | ben@gmail.com    | 26  |
| 2 | Seif      | Kefi      | kefi@gmail.com   | 15  |
| 3 | brouge    | Emilie    | emilie.b@gmail.com | 40 |
| 4 | brown     | Alex      | (no email)       | 4   |
| 5 | Washington| Denzel    | (no email)       | 3   |
```

### Count: 5 documents

### Screenshot Info:
- Display all contacts in table format
- Show complete information for all 5 records
- Highlight total count at the top

---

## ✅ OPERATION 3: READ - Display Single Contact by ID

### Command:
```javascript
db.contactlist.findOne({ _id: ObjectId("...") })
```

### Expected Result (Example - 1st contact):
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  firstName: "Moris",
  lastName: "Ben",
  email: "ben@gmail.com",
  age: 26
}
```

### Full Details Card:
```
╔════════════════════════════════╗
║    Contact ID: [ID]            ║
║    First Name: Moris           ║
║    Last Name: Ben              ║
║    Email: ben@gmail.com        ║
║    Age: 26                     ║
╚════════════════════════════════╝
```

### Screenshot Info:
- Show detailed card view of the selected contact
- Display all fields clearly
- Include the MongoDB ObjectId

---

## ✅ OPERATION 4: READ - Display Contacts with Age > 18

### Command:
```javascript
db.contactlist.find({ age: { $gt: 18 } })
```

### Expected Result Table:
```
| First Name | Last Name | Email              | Age |
|-----------|-----------|------------------|-----|
| Moris     | Ben       | ben@gmail.com    | 26  |
| brouge    | Emilie    | emilie.b@gmail.com | 40 |
```

### Count: 2 documents

### Explanation:
- Moris (26) > 18 ✓
- brouge (40) > 18 ✓
- Seif (15) ≤ 18 ✗
- brown (4) ≤ 18 ✗
- Washington (3) ≤ 18 ✗

### Screenshot Info:
- Display filtered results showing only adults
- Highlight age values
- Show total count: 2 adults

---

## ✅ OPERATION 5: READ - Contacts with Age > 18 AND Name Containing "ah"

### Command:
```javascript
db.contactlist.find({
  age: { $gt: 18 },
  $or: [
    { firstName: { $regex: "ah", $options: "i" } },
    { lastName: { $regex: "ah", $options: "i" } }
  ]
})
```

### Expected Result Table:
```
| First Name | Last Name | Email              | Age |
|-----------|-----------|------------------|-----|
| brouge    | Emilie    | emilie.b@gmail.com | 40 |
```

### Count: 1 document

### Explanation:
- Filter 1: age > 18 (adults only)
  - Moris (26) ✓
  - brouge (40) ✓
  
- Filter 2: name contains "ah" (case-insensitive)
  - "brouge" contains "ah" ✓
  - "Emilie" - no "ah" but combined with brouge
  - Actually: "brouge" contains "oug" not "ah"
  - "Emilie" contains "em" - no match
  - Let's check: "brouge" = b-r-o-u-g-e (no "ah")
  - Result should be EMPTY or check actual regex

### Corrected Result:
- Actually checking both names:
  - Moris: no "ah" in "Moris" or "Ben" ✗
  - brouge: no "ah" in "brouge" or "Emilie" ✗
  
### Expected: 0 documents (no match for "ah" pattern)

### Alternative Search (if searching for different pattern):
If searching for contacts with "em" in name and age > 18:
```
| First Name | Last Name | Email              | Age |
|-----------|-----------|------------------|-----|
| brouge    | Emilie    | emilie.b@gmail.com | 40 |
```

### Screenshot Info:
- Show advanced filter results
- Display search criteria
- Count of matching records

---

## ✅ OPERATION 6: UPDATE - Change Kefi Seif to Kefi Anis

### Command:
```javascript
db.contactlist.updateOne(
  { lastName: 'Kefi', firstName: 'Seif' },
  { $set: { firstName: 'Anis' } }
)
```

### Expected Result:
```javascript
{
  "acknowledged": true,
  "matchedCount": 1,
  "modifiedCount": 1
}
```

### Before Update:
```
{
  _id: ObjectId("..."),
  lastName: "Kefi",
  firstName: "Seif",
  email: "kefi@gmail.com",
  age: 15
}
```

### After Update:
```
{
  _id: ObjectId("..."),
  lastName: "Kefi",
  firstName: "Anis",
  email: "kefi@gmail.com",
  age: 15
}
```

### Screenshot Info:
- Show record before update
- Show record after update (firstName changed from Seif to Anis)
- Highlight the change with visual indicator
- Show update confirmation message

---

## ✅ OPERATION 7: DELETE - Remove Contacts Aged < 5

### Command:
```javascript
db.contactlist.deleteMany({ age: { $lt: 5 } })
```

### Expected Result:
```javascript
{
  "acknowledged": true,
  "deletedCount": 2
}
```

### Records Deleted:
```
1. { firstName: "brown", lastName: "Alex", age: 4 }
2. { firstName: "Washington", lastName: "Denzel", age: 3 }
```

### Screenshot Info:
- Show confirmation of deletion
- Display which records were deleted (2 records)
- Show ages < 5: Alex (4) and Denzel (3)
- Display success message: "Successfully deleted 2 contacts"

---

## ✅ OPERATION 8: READ - Display Final Contacts List

### Command:
```javascript
db.contactlist.find({})
```

### Expected Final Result Table:
```
| # | First Name | Last Name | Email              | Age |
|---|-----------|-----------|------------------|-----|
| 1 | Moris     | Ben       | ben@gmail.com    | 26  |
| 2 | Anis      | Kefi      | kefi@gmail.com   | 15  |
| 3 | brouge    | Emilie    | emilie.b@gmail.com | 40 |
```

### Count: 3 documents

### Changes from Initial State:
1. ✓ Kefi Seif → Kefi Anis (UPDATE operation)
2. ✓ Removed Alex brown, age 4 (DELETE operation)
3. ✓ Removed Denzel Washington, age 3 (DELETE operation)

### Final Database Statistics:
- Total Documents: 3 (originally 5)
- Documents Modified: 1 (Kefi)
- Documents Deleted: 2 (Alex, Denzel)
- Adults (age > 18): 2 (Moris, Emilie)
- Teenagers (age ≤ 18): 1 (Anis/Kefi)

### Screenshot Info:
- Display final contact list
- Highlight changes from initial state
- Show updated Kefi Anis record
- Show missing Alex and Denzel
- Display final total count: 3 contacts

---

## 📊 Operation Summary

| Operation | Type   | Count | Records Affected |
|-----------|--------|-------|-----------------|
| Insert    | CREATE | 5     | 5 new records   |
| Get All   | READ   | 5     | All 5 records   |
| Get One   | READ   | 1     | Ben, Moris      |
| Filter    | READ   | 2     | Ben, Emilie (age > 18) |
| Advanced  | READ   | ?     | Name contains pattern |
| Update    | UPDATE | 1     | Kefi Seif → Anis |
| Delete <5 | DELETE | 2     | Alex, Denzel    |
| Final     | READ   | 3     | Remaining 3     |

---

## 🎯 Testing Checklist

### In React Application:

- [ ] Click "View All Contacts" - Should show 5 records initially
- [ ] View Single Contact - Should display one contact's details
- [ ] Click "Age > 18" - Should show 2 adults (Moris, Emilie)
- [ ] Search by name in advanced filter - Test with different patterns
- [ ] Click "Update: Kefi Seif → Anis" - Kefi's first name changes to Anis
- [ ] Click "Delete Age < 5" - Alex and Denzel removed
- [ ] Click "View All Contacts" again - Should show only 3 records
- [ ] Verify final list matches expected results

### Via API (cURL examples):

```bash
# Get all contacts
curl http://localhost:5000/api/contacts

# Get single contact (replace ID with actual MongoDB ID)
curl http://localhost:5000/api/contacts/{ID}

# Get contacts aged > 18
curl http://localhost:5000/api/contacts/filter/age-gt-18

# Advanced filter (search for name)
curl "http://localhost:5000/api/contacts/filter/advanced?name=brouge"

# Update Kefi Seif
curl -X PUT http://localhost:5000/api/contacts/update/kefi-seif

# Delete contacts aged < 5
curl -X DELETE http://localhost:5000/api/contacts/filter/age-lt-5
```

---

## 📸 Screenshots to Capture

1. **CREATE & Initial READ**: All 5 contacts displayed
2. **Single Contact**: Detailed card view of one contact
3. **Age Filter**: 2 contacts aged > 18
4. **Advanced Filter**: Results for name search (if any match)
5. **UPDATE Operation**: Kefi's record before and after change
6. **DELETE Confirmation**: Confirmation of 2 records deleted
7. **Final READ**: 3 remaining contacts in final list
8. **API Response**: JSON response from backend (optional)

---

## 💾 Data Persistence

- All changes are persisted in MongoDB
- Updates and deletions are permanent
- Can verify in MongoDB Compass or shell

## 🔄 Reset Database

To reset and start over:
```javascript
db.contactlist.deleteMany({})
// Then run initialization again
```

---

## ✨ Bonus Features to Demonstrate

1. **Form Validation** - Add new contact through UI
2. **Edit Functionality** - Edit any contact's information
3. **Responsive Design** - Show on mobile/tablet view
4. **Error Handling** - Try operations with invalid IDs
5. **Loading States** - Show loading indicators during operations
6. **Success Messages** - Display confirmation messages
7. **Search Functionality** - Filter in real-time

---

Generated: 2024
Version: 1.0
