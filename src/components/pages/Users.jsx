import React, { useState, useEffect } from 'react';
import {
  Card, Table, Button, Form, Modal, Row, Col, Badge
} from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Users = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  // 👉 Start with empty user list
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const generateRegId = () => {
    const nextId = userList.length + 1;
    return `REG${String(nextId).padStart(3, '0')}`;
  };

  const handleSave = () => {
    if (editingUser?.id) {
      // Update existing user
      setUserList(prev =>
        prev.map(user => (user.id === editingUser.id ? editingUser : user))
      );
    } else {
      // Add new user
      const newUser = {
        ...editingUser,
        id: Date.now(),
        regId: generateRegId(),
      };
      setUserList(prev => [...prev, newUser]);
    }
    setShowModal(false);
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete this user?')) {
      setUserList(prev => prev.filter(user => user.id !== id));
    }
  };

  const filteredUsers = userList.filter(user =>
    `${user.regId} ${user.firstName} ${user.lastName} ${user.email} ${user.username} ${user.role}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('User List', 14, 15);
    autoTable(doc, {
      startY: 20,
      head: [['Reg ID', 'First Name', 'Last Name', 'Phone', 'Email', 'Username', 'Role']],
      body: filteredUsers.map(user => [
        user.regId,
        user.firstName,
        user.lastName,
        user.phone,
        user.email,
        user.username,
        user.role,
      ])
    });
    doc.save('user-list.pdf');
  };

  return (
    <>
      <Card
        className="m-4 shadow-sm"
        style={{
          opacity: fadeIn ? 1 : 0,
          transition: 'opacity 0.5s ease-in'
        }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-primary">👥 User Management</h4>
            <div className="d-flex gap-2">
              <Button onClick={() => {
                setEditingUser({
                  firstName: '', lastName: '', phone: '', email: '',
                  username: '', password: '', role: ''
                });
                setShowModal(true);
              }}>+ Add User</Button>
              <Button variant="outline-secondary" onClick={exportToPDF}>Export</Button>
            </div>
          </div>

          <Form className="mb-3">
            <Form.Control
              placeholder="Search by reg ID, name, email, username, or role"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          <div className="table-responsive">
            <Table hover bordered className="text-center align-middle bg-white">
              <thead>
                <tr className="table-light">
                  <th>Reg ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length ? (
                  filteredUsers.map(user => (
                    <tr key={user.id}>
                      <td>{user.regId}</td>
                      <td>{user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.phone}</td>
                      <td>{user.email}</td>
                      <td>{user.username}</td>
                      <td>
                        <Badge bg={user.role === 'Parent' ? 'success' : 'info'}>
                          {user.role}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2 justify-content-center">
                          <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => {
                              setEditingUser(user);
                              setShowModal(true);
                            }}
                          >Edit</Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() => handleDelete(user.id)}
                          >Delete</Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8" className="text-muted">No users found.</td></tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingUser?.id ? '✏️ Edit User' : '➕ Add User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <Form>
              {editingUser.regId && (
                <div className="mb-2">
                  <Form.Label>Registration ID</Form.Label>
                  <Form.Control value={editingUser.regId} disabled />
                </div>
              )}
              <Row className="mb-2">
                <Col>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    value={editingUser.firstName}
                    onChange={e => setEditingUser({ ...editingUser, firstName: e.target.value })}
                  />
                </Col>
                <Col>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    value={editingUser.lastName}
                    onChange={e => setEditingUser({ ...editingUser, lastName: e.target.value })}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    value={editingUser.phone}
                    onChange={e => setEditingUser({ ...editingUser, phone: e.target.value })}
                  />
                </Col>
                <Col>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={editingUser.email}
                    onChange={e => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col>
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    value={editingUser.username}
                    onChange={e => setEditingUser({ ...editingUser, username: e.target.value })}
                  />
                </Col>
                <Col>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={editingUser.password}
                    onChange={e => setEditingUser({ ...editingUser, password: e.target.value })}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    value={editingUser.role}
                    onChange={e => setEditingUser({ ...editingUser, role: e.target.value })}
                  >
                    <option value="">Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Parent">Parent</option>
                  </Form.Select>
                </Col>
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
