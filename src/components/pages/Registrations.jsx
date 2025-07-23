import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Table, Button, Form, Modal } from 'react-bootstrap';

const Registrations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);

    console.log('Fetching registrations...');
    axios.get('http://localhost:8000/api/registrations')
      .then(response => {
        console.log('Response received:', response.data);
        const mappedRegistrations = response.data.map(reg => ({
          regId: reg.reg_id,
          registrationId: reg.registration_id,
          firstName: reg.first_name,
          lastName: reg.last_name,
          phone: reg.mobile,
          email: reg.email,
          password: reg.password,
          role: reg.role,
          mappedUserId: reg.mapped_user_id,
        }));
        console.log('Mapped registrations:', mappedRegistrations);
        setUsers(mappedRegistrations);
      })
      .catch(error => {
        console.error('Error fetching registrations:', error);
      });
  }, []);

  const filteredUsers = users.filter(user =>
    Object.values(user).some(val =>
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <>
      <Card
        style={{
          margin: '2rem auto',
          maxWidth: '1000px',
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.5s ease-in',
        }}
      >
        <Card.Body>
          <h4 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            📝 User Registrations
          </h4>

          <Form style={{ marginBottom: '1rem' }}>
            <Form.Control
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ fontSize: '1rem', padding: '0.75rem' }}
            />
          </Form>

          <Table striped bordered hover responsive>
            <thead style={{ backgroundColor: '#007bff', color: '#fff' }}>
              <tr style={{ textAlign: 'center' }}>
                <th>Reg ID</th>
                <th>Registration ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Role</th>
                <th>Mapped User ID</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <tr key={index} style={{ textAlign: 'center' }}>
                    <td>{user.regId}</td>
                    <td>{user.registrationId}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.mappedUserId}</td>
                    <td>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleView(user)}
                        style={{ fontSize: '0.9rem' }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', color: '#888' }}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal for user details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <p><strong>Registration ID:</strong> {selectedUser.regId}</p>
              <p><strong>First Name:</strong> {selectedUser.firstName}</p>
              <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Username:</strong> {selectedUser.username}</p>
              <p><strong>Password:</strong> {selectedUser.password}</p>
              <p><strong>Role:</strong> {selectedUser.role}</p>
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
