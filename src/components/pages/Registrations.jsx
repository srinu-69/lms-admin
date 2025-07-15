import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, Modal, Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

const Registrations = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔁 Fetch user data from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://your-backend-api.com/api/registrations'); // Replace with your actual endpoint
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching registration data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Initial load
    const interval = setInterval(fetchUsers, 10000); // Auto-refresh every 10 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.class.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.referralId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.referralName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('Student Registrations', 14, 15);

    autoTable(doc, {
      head: [['ID', 'Name', 'Class', 'Date', 'Amount Paid', 'Subjects', 'Referral ID', 'Referral Name']],
      body: filteredUsers.map(user => [
        user.id,
        user.name,
        user.class,
        user.date,
        `₹${user.amountPaid}`,
        user.subjects.join(', '),
        user.referralId,
        user.referralName
      ]),
      startY: 20,
    });

    doc.save('registrations.pdf');
  };

  return (
    <>
      <Card className="text-center shadow-sm fade-in">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="animated-heading w-100 text-center mb-0">📝 New Registrations</h4>
            <Button variant="primary" size="sm" onClick={exportToPDF}>Export</Button>
          </div>

          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by name, class, referral ID, or referral name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form>

          {loading ? (
            <div className="text-center p-4">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Table hover responsive className="text-center">
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Date</th>
                  <th>Referral ID</th>
                  <th>Referral Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.class}</td>
                      <td>{user.date}</td>
                      <td>{user.referralId}</td>
                      <td>{user.referralName}</td>
                      <td>
                        <Button variant="outline-primary" size="sm" onClick={() => handleView(user)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-muted">No users found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* View Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>📋 Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p><strong>Name:</strong> {selectedUser.name}</p>
              <p><strong>Class:</strong> {selectedUser.class}</p>
              <p><strong>Date:</strong> {selectedUser.date}</p>
              <p><strong>Amount Paid:</strong> ₹{selectedUser.amountPaid}</p>
              <p><strong>Subjects:</strong> {selectedUser.subjects.join(', ')}</p>
              <p><strong>Referral ID:</strong> {selectedUser.referralId}</p>
              <p><strong>Referral Name:</strong> {selectedUser.referralName}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Registrations;
