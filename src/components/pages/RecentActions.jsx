import React, { useState, useEffect } from 'react';
import {
  Card, ListGroup, Button, Modal, Form, Row, Col, Alert,
} from 'react-bootstrap';

// Static mock data
const mockActions = [
  {
    id: 1,
    icon: '🛠️',
    text: 'Fixed dashboard bug',
    time: '09:30 AM',
    admin: 'Alice',
    details: 'Resolved issue with chart rendering in dashboard module.',
  },
  {
    id: 2,
    icon: '📢',
    text: 'Announced new feature',
    time: '11:00 AM',
    admin: 'Bob',
    details: 'Posted announcement about the new export feature in user panel.',
  },
  {
    id: 3,
    icon: '🔒',
    text: 'Updated password policy',
    time: '03:15 PM',
    admin: 'Charlie',
    details: 'Minimum length increased to 10 characters, added 2FA by default.',
  },
];

const RecentActions = () => {
  const [actions, setActions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [error] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  const [newAction, setNewAction] = useState({
    icon: '📝',
    text: '',
    time: '',
    admin: '',
    details: '',
  });

  // Load data
  useEffect(() => {
    const stored = localStorage.getItem('recentActions');
    if (stored) {
      setActions(JSON.parse(stored));
    } else {
      setActions(mockActions);
      localStorage.setItem('recentActions', JSON.stringify(mockActions));
    }

    // Fade-in effect
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleAddAction = (e) => {
    e.preventDefault();
    const { text, time, admin, details } = newAction;
    if (!text || !time || !admin || !details) {
      alert('Please fill all fields');
      return;
    }

    const newEntry = {
      ...newAction,
      id: Date.now(),
    };

    const updatedActions = [newEntry, ...actions];
    setActions(updatedActions);
    localStorage.setItem('recentActions', JSON.stringify(updatedActions));

    setNewAction({
      icon: '📝',
      text: '',
      time: '',
      admin: '',
      details: '',
    });

    setFadeIn(false);
    setTimeout(() => setFadeIn(true), 100); // Trigger fade-in for new item
  };

  const handleViewDetails = (action) => {
    setSelectedAction(action);
    setShowModal(true);
  };

  return (
    <>
      <Card className={`shadow-sm my-3 ${fadeIn ? 'fade-in' : ''}`} style={{ transition: 'opacity 0.6s ease-in', opacity: fadeIn ? 1 : 0 }}>
        <Card.Header className="text-center bg-light">
          <h4 className="mb-0">📋 Recent Actions</h4>
        </Card.Header>

        <Card.Body>
          {error && <Alert variant="warning" className="text-center">{error}</Alert>}

          {/* Add Form */}
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

        {/* List of Actions */}
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

      {/* Modal */}
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
