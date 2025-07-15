import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Card, ListGroup, Button, Modal, Form, Row, Col, Alert
} from 'react-bootstrap';

const RecentActions = () => {
  const [actions, setActions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [error, setError] = useState('');

  const [newAction, setNewAction] = useState({
    icon: '📝',
    text: '',
    time: '',
    admin: '',
    details: ''
  });

  // 🔄 Load from backend or localStorage
  const fetchActions = async () => {
    try {
      const res = await axios.get('/api/recent-actions');
      setActions(res.data);
      localStorage.setItem('recentActions', JSON.stringify(res.data));
      setError('');
    } catch (err) {
      const stored = localStorage.getItem('recentActions');
      if (stored) {
        setActions(JSON.parse(stored));
        setError('⚠️ Using offline data. Backend not reachable.');
      } else {
        setActions([]);
        setError('❌ No data available. Backend and local cache both failed.');
      }
    }
  };

  useEffect(() => {
    fetchActions();
    const interval = setInterval(fetchActions, 30000); // every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // ➕ Add new action
  const handleAddAction = async (e) => {
    e.preventDefault();
    if (!newAction.text || !newAction.time || !newAction.admin || !newAction.details) {
      alert('Please fill all fields');
      return;
    }

    const newEntry = { ...newAction, id: Date.now() };
    setActions(prev => [newEntry, ...prev]);
    localStorage.setItem('recentActions', JSON.stringify([newEntry, ...actions]));

    try {
      await axios.post('/api/recent-actions', newEntry);
    } catch {
      alert('Failed to sync with backend. Saved locally.');
    }

    setNewAction({
      icon: '📝',
      text: '',
      time: '',
      admin: '',
      details: ''
    });
  };

  const handleViewDetails = (action) => {
    setSelectedAction(action);
    setShowModal(true);
  };

  return (
    <>
      <Card className="shadow-sm fade-in my-3">
        <Card.Header className="text-center">
          <h4 className="animated-heading mb-0">📋 Recent Actions</h4>
        </Card.Header>

        <Card.Body>
          {error && <Alert variant="warning" className="text-center">{error}</Alert>}

          {/* ➕ Add Form */}
          <Form onSubmit={handleAddAction}>
            <Row className="g-2 mb-2">
              <Col md={2}>
                <Form.Control
                  value={newAction.icon}
                  onChange={(e) => setNewAction({ ...newAction, icon: e.target.value })}
                  placeholder="Emoji"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={newAction.text}
                  onChange={(e) => setNewAction({ ...newAction, text: e.target.value })}
                  placeholder="Action Text"
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  value={newAction.time}
                  onChange={(e) => setNewAction({ ...newAction, time: e.target.value })}
                  placeholder="Time (e.g. 10:00 AM)"
                />
              </Col>
              <Col md={2}>
                <Form.Control
                  value={newAction.admin}
                  onChange={(e) => setNewAction({ ...newAction, admin: e.target.value })}
                  placeholder="Admin"
                />
              </Col>
              <Col md={2}>
                <Button type="submit" variant="success" className="w-100">Add</Button>
              </Col>
            </Row>
            <Form.Control
              as="textarea"
              placeholder="Action details..."
              value={newAction.details}
              onChange={(e) => setNewAction({ ...newAction, details: e.target.value })}
              rows={2}
              className="mb-2"
            />
          </Form>
        </Card.Body>

        {/* 🧾 List of Actions */}
        <ListGroup variant="flush">
          {actions.length > 0 ? actions.map(action => (
            <ListGroup.Item key={action.id} className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <span className="me-3 fs-5">{action.icon}</span>
                <div>
                  <div>{action.text}</div>
                  <small className="text-muted">{action.time} • By: {action.admin}</small>
                </div>
              </div>
              <Button variant="outline-primary" size="sm" onClick={() => handleViewDetails(action)}>
                View
              </Button>
            </ListGroup.Item>
          )) : (
            <ListGroup.Item className="text-center text-muted">No actions yet.</ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      {/* 👁️‍🗨️ View Details Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Action Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedAction && (
            <>
              <h5>{selectedAction.icon} {selectedAction.text}</h5>
              <p><strong>Time:</strong> {selectedAction.time}</p>
              <p><strong>By:</strong> {selectedAction.admin}</p>
              <hr />
              <p>{selectedAction.details}</p>
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

export default RecentActions;
