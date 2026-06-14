import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactManager.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [view, setView] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch all contacts on mount
  useEffect(() => {
    fetchAllContacts();
  }, []);

  // Clear messages after 3 seconds
  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  // ===== API CALLS =====

  // Fetch all contacts
  const fetchAllContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/contacts`);
      setContacts(response.data.data);
      setFilteredContacts(response.data.data);
      setView('all');
    } catch (err) {
      setError('Failed to fetch contacts: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single contact by ID
  const fetchContactById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/contacts/${id}`);
      setSelectedContact(response.data.data);
      setView('single');
    } catch (err) {
      setError('Contact not found: ' + err.message);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch contacts with age > 18
  const fetchContactsByAge = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/contacts/filter/age-gt-18`);
      setFilteredContacts(response.data.data);
      setView('age');
    } catch (err) {
      setError('Failed to fetch contacts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch contacts with advanced filter
  const fetchFilteredContacts = async () => {
    if (!filterName.trim()) {
      setError('Please enter a name to search');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_URL}/contacts/filter/advanced`, {
        params: { name: filterName }
      });
      setFilteredContacts(response.data.data);
      setView('filtered');
    } catch (err) {
      setError('No results found: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Create contact
  const createContact = async (contactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${API_URL}/contacts`, contactData);
      setContacts([...contacts, response.data.data]);
      setFilteredContacts([...contacts, response.data.data]);
      setSuccess('Contact created successfully!');
      setEditingContact(null);
      setView('all');
    } catch (err) {
      setError('Failed to create contact: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update contact
  const updateContactAPI = async (id, contactData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URL}/contacts/${id}`, contactData);
      setContacts(contacts.map(c => c._id === id ? response.data.data : c));
      setFilteredContacts(filteredContacts.map(c => c._id === id ? response.data.data : c));
      setSuccess('Contact updated successfully!');
      setEditingContact(null);
      setView('all');
    } catch (err) {
      setError('Failed to update contact: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update Kefi Seif to Kefi Anis
  const updateKefiSeif = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${API_URL}/contacts/update/kefi-seif`);
      setContacts(contacts.map(c => 
        c.lastName === 'Kefi' && c.firstName === 'Seif' 
          ? response.data.data 
          : c
      ));
      setFilteredContacts(filteredContacts.map(c => 
        c.lastName === 'Kefi' && c.firstName === 'Seif' 
          ? response.data.data 
          : c
      ));
      setSuccess('Kefi Seif updated to Kefi Anis!');
    } catch (err) {
      setError('Failed to update: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete contact
  const deleteContactAPI = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) return;
    
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${API_URL}/contacts/${id}`);
      const updated = contacts.filter(c => c._id !== id);
      setContacts(updated);
      setFilteredContacts(updated);
      setSuccess('Contact deleted successfully!');
    } catch (err) {
      setError('Failed to delete contact: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete contacts aged < 5
  const deleteUnderFive = async () => {
    if (!window.confirm('Are you sure you want to delete all contacts under 5 years old?')) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${API_URL}/contacts/filter/age-lt-5`);
      const updated = contacts.filter(c => c.age >= 5);
      setContacts(updated);
      setFilteredContacts(updated);
      setSuccess(`${response.data.deletedCount} contact(s) deleted successfully!`);
    } catch (err) {
      setError('Failed to delete contacts: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // ===== RENDER =====

  return (
    <div className="contact-manager">
      <header className="header">
        <h1>📇 MongoDB Contact Manager</h1>
        <p>Complete CRUD Operations with Backend Integration</p>
      </header>

      {/* Messages */}
      {success && (
        <div className="alert alert-success">
          ✓ {success}
        </div>
      )}
      {error && (
        <div className="alert alert-error">
          ✗ {error}
        </div>
      )}

      {loading && (
        <div className="alert alert-info">
          ⏳ Loading...
        </div>
      )}

      <div className="container">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <section className="operation-section">
            <h3>📖 READ Operations</h3>
            <button 
              className="btn btn-primary" 
              onClick={fetchAllContacts}
              disabled={loading}
            >
              View All Contacts
            </button>
            
            <div className="filter-group">
              <input
                type="text"
                placeholder="Enter contact ID (MongoDB)"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    fetchContactById(e.target.value);
                  }
                }}
              />
              <button 
                className="btn btn-info"
                disabled={loading}
              >
                View by ID
              </button>
            </div>

            <button 
              className="btn btn-secondary" 
              onClick={fetchContactsByAge}
              disabled={loading}
            >
              Age > 18
            </button>

            <div className="filter-group">
              <input
                type="text"
                placeholder="Search name (age > 18)"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
              <button 
                className="btn btn-info"
                onClick={fetchFilteredContacts}
                disabled={loading}
              >
                Filter
              </button>
            </div>
          </section>

          <section className="operation-section">
            <h3>✏️ UPDATE Operations</h3>
            <button 
              className="btn btn-warning" 
              onClick={() => {
                setEditingContact(null);
                setView('edit');
              }}
              disabled={loading}
            >
              Add New Contact
            </button>

            <button 
              className="btn btn-warning" 
              onClick={updateKefiSeif}
              disabled={loading}
            >
              Update: Kefi Seif → Anis
            </button>
          </section>

          <section className="operation-section">
            <h3>🗑️ DELETE Operations</h3>
            <button 
              className="btn btn-danger" 
              onClick={deleteUnderFive}
              disabled={loading}
            >
              Delete Age < 5
            </button>
          </section>
        </aside>

        {/* MAIN CONTENT */}
        <main className="main-content">
          {/* All Contacts View */}
          {view === 'all' && !loading && (
            <section className="view-section">
              <h2>📋 All Contacts ({filteredContacts.length})</h2>
              <div className="table-responsive">
                <table className="contacts-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map(contact => (
                      <tr key={contact._id}>
                        <td>{contact._id.substring(0, 8)}...</td>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email || 'N/A'}</td>
                        <td>{contact.age}</td>
                        <td className="actions">
                          <button 
                            className="btn btn-small btn-info"
                            onClick={() => fetchContactById(contact._id)}
                            disabled={loading}
                          >
                            View
                          </button>
                          <button 
                            className="btn btn-small btn-warning"
                            onClick={() => {
                              setEditingContact(contact);
                              setView('edit');
                            }}
                            disabled={loading}
                          >
                            Edit
                          </button>
                          <button 
                            className="btn btn-small btn-danger"
                            onClick={() => deleteContactAPI(contact._id)}
                            disabled={loading}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Single Contact View */}
          {view === 'single' && selectedContact && !loading && (
            <section className="view-section">
              <h2>👤 Contact Details</h2>
              <div className="card">
                <div className="card-field">
                  <label>ID:</label>
                  <span>{selectedContact._id}</span>
                </div>
                <div className="card-field">
                  <label>First Name:</label>
                  <span>{selectedContact.firstName}</span>
                </div>
                <div className="card-field">
                  <label>Last Name:</label>
                  <span>{selectedContact.lastName}</span>
                </div>
                <div className="card-field">
                  <label>Email:</label>
                  <span>{selectedContact.email || 'N/A'}</span>
                </div>
                <div className="card-field">
                  <label>Age:</label>
                  <span>{selectedContact.age}</span>
                </div>
                <div className="card-field">
                  <label>Created At:</label>
                  <span>{new Date(selectedContact.createdAt).toLocaleDateString()}</span>
                </div>
                <button 
                  className="btn btn-primary" 
                  onClick={fetchAllContacts}
                >
                  Back to All Contacts
                </button>
              </div>
            </section>
          )}

          {/* Age Filter View */}
          {view === 'age' && !loading && (
            <section className="view-section">
              <h2>📊 Contacts with Age > 18 ({filteredContacts.length})</h2>
              {filteredContacts.length === 0 ? (
                <p className="no-results">No contacts found</p>
              ) : (
                <div className="table-responsive">
                  <table className="contacts-table">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map(contact => (
                        <tr key={contact._id}>
                          <td>{contact.firstName}</td>
                          <td>{contact.lastName}</td>
                          <td>{contact.email || 'N/A'}</td>
                          <td><span className="badge">{contact.age}</span></td>
                          <td className="actions">
                            <button 
                              className="btn btn-small btn-danger"
                              onClick={() => deleteContactAPI(contact._id)}
                              disabled={loading}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Filtered View */}
          {view === 'filtered' && !loading && (
            <section className="view-section">
              <h2>🔍 Filtered Results - {filteredContacts.length} found</h2>
              {filteredContacts.length === 0 ? (
                <p className="no-results">No contacts match your criteria</p>
              ) : (
                <div className="table-responsive">
                  <table className="contacts-table">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Age</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredContacts.map(contact => (
                        <tr key={contact._id}>
                          <td>{contact.firstName}</td>
                          <td>{contact.lastName}</td>
                          <td>{contact.email || 'N/A'}</td>
                          <td>{contact.age}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* Edit Contact View */}
          {view === 'edit' && !loading && (
            <section className="view-section">
              <h2>✏️ {editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>
              <EditContactForm 
                contact={editingContact}
                onUpdate={updateContactAPI}
                onAdd={createContact}
                onCancel={() => {
                  setEditingContact(null);
                  fetchAllContacts();
                }}
              />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

// ===== EDIT CONTACT FORM =====
const EditContactForm = ({ contact, onUpdate, onAdd, onCancel }) => {
  const [formData, setFormData] = useState(
    contact || { firstName: '', lastName: '', email: '', age: '' }
  );
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'age' ? (value ? parseInt(value) : '') : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setValidationError('First name and Last name are required');
      return;
    }

    if (formData.age && (isNaN(formData.age) || formData.age < 0)) {
      setValidationError('Age must be a valid positive number');
      return;
    }

    if (contact) {
      onUpdate(contact._id, formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <div className="form-container">
      {validationError && (
        <div className="alert alert-error">{validationError}</div>
      )}
      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name *</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name *</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age || ''}
            onChange={handleChange}
            min="0"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {contact ? 'Update Contact' : 'Add Contact'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactManager;
