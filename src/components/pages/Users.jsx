import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Form, Modal, Row, Col, Spinner } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';
import '../../App.css'; // ✅ Ensure path is correct

const Users = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://your-backend-api.com/api/users'); // 🔁 Change URL
      setUserList(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load users:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(); // Initial load
    const interval = setInterval(fetchUsers, 10000); // 🔁 Auto-update every 10 seconds
    return () => clearInterval(interval); // Cleanup
  }, []);

  const handleSave = async () => {
    try {
      if (editingUser.id) {
        // ✏️ Update user
        await axios.put(`https://your-backend-api.com/api/users/${editingUser.id}`, editingUser);
      } else {
        // ➕ Add new user
        await axios.post('https://your-backend-api.com/api/users', editingUser);
      }
      setShowModal(false);
      setEditingUser(null);
      fetchUsers(); // Refresh
    } catch (err) {
      console.error('Error saving user:', err);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://your-backend-api.com/api/users/${userId}`);
        fetchUsers(); // Refresh
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('User List', 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [['ID', 'Name', 'Email', 'Role', 'Status', 'Referral ID', 'Referral Name']],
      body: filteredUsers.map(user => [
        user.id,
        user.name,
        user.email,
        user.role,
        user.status,
        user.referralId,
        user.referralName
      ])
    });
    doc.save('user-list.pdf');
  };

  const filteredUsers = userList.filter(user =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.role.toLowerCase().includes(search.toLowerCase()) ||
    user.referralId.toLowerCase().includes(search.toLowerCase()) ||
    user.referralName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Card className="text-center fade-in shadow-sm my-4 mx-2 mx-md-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
            <h4 className="animated-heading mb-2">👥 User Management</h4>
            <div className="d-flex gap-2">
              <Button
                variant="success"
                size="sm"
                onClick={() => {
                  setEditingUser({
                    name: '',
                    email: '',
                    role: '',
                    status: 'Active',
                    referralId: '',
                    referralName: ''
                  });
                  setShowModal(true);
                }}
              >+ Add User</Button>
              <Button variant="outline-primary" size="sm" onClick={exportToPDF}>Export</Button>
            </div>
          </div>

          <Form className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search by name, email, role, or referral..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          {loading ? (
            <div className="text-center p-4">
              <Spinner animation="border" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover responsive className="text-center align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Referral ID</th>
                    <th>Referral Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>
                          <Badge bg={user.status === 'Active' ? 'success' : 'secondary'}>
                            {user.status}
                          </Badge>
                        </td>
                        <td>{user.referralId}</td>
                        <td>{user.referralName}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <Button variant="outline-primary" size="sm" onClick={() => {
                              setEditingUser(user);
                              setShowModal(true);
                            }}>Edit</Button>
                            <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.id)}>Delete</Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="text-muted">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser?.id ? '✏️ Edit User' : '➕ Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <Form>
              <Row className="mb-2">
                <Col><Form.Label>Name</Form.Label><Form.Control value={editingUser.name} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} /></Col>
                <Col><Form.Label>Email</Form.Label><Form.Control value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} /></Col>
              </Row>
              <Row className="mb-2">
                <Col><Form.Label>Role</Form.Label><Form.Control value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} /></Col>
                <Col>
                  <Form.Label>Status</Form.Label>
                  <Form.Select value={editingUser.status} onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mb-2">
                <Col><Form.Label>Referral ID</Form.Label><Form.Control value={editingUser.referralId} onChange={(e) => setEditingUser({ ...editingUser, referralId: e.target.value })} /></Col>
                <Col><Form.Label>Referral Name</Form.Label><Form.Control value={editingUser.referralName} onChange={(e) => setEditingUser({ ...editingUser, referralName: e.target.value })} /></Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Users;
