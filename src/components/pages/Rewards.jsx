import React, { useEffect, useState } from 'react';
import {
  Row, Col, Card, ListGroup, Badge, Table,
  Button, Modal, Form, Alert
} from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, BarElement, CategoryScale,
  LinearScale, Tooltip, Legend
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error] = useState('');
  const [formData, setFormData] = useState({
    id: null, name: '', type: '', category: '', reward: '', date: '', class: ''
  });

  useEffect(() => {
    const stored = localStorage.getItem('rewards');
    if (stored) {
      const parsed = JSON.parse(stored).map(r =>
        r.class === 'Class 5' ? { ...r, class: 'Class 8' } : r
      );
      setRewards(parsed);
      localStorage.setItem('rewards', JSON.stringify(parsed));
    } else {
      const staticData = [
        {
          id: 1, name: 'Aryan', type: 'Student', category: 'Gold',
          reward: 'Top Scorer', date: '2025-07-01', class: 'Class 10'
        },
        {
          id: 2, name: 'Sneha', type: 'Student', category: 'Silver',
          reward: 'Best Attendance', date: '2025-07-05', class: 'Class 8'
        },
        {
          id: 3, name: 'Ravi', type: 'Parent', category: 'Bronze',
          reward: 'Supportive Parent', date: '2025-07-03', class: 'Class 8'
        }
      ];
      setRewards(staticData);
      localStorage.setItem('rewards', JSON.stringify(staticData));
    }
  }, []);

  const openAddModal = () => {
    setEditMode(false);
    setFormData({
      id: null, name: '', type: '', category: '', reward: '', date: '', class: ''
    });
    setShowModal(true);
  };

  const openEditModal = (reward) => {
    setEditMode(true);
    setFormData(reward);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    const updated = rewards.filter(r => r.id !== id);
    setRewards(updated);
    localStorage.setItem('rewards', JSON.stringify(updated));
  };

  const handleSave = () => {
    if (!formData.name || !formData.type || !formData.category || !formData.reward || !formData.date || !formData.class) {
      alert('Please fill all fields');
      return;
    }

    let updated;
    if (editMode) {
      updated = rewards.map(r => (r.id === formData.id ? formData : r));
    } else {
      const newId = rewards.length ? Math.max(...rewards.map(r => r.id)) + 1 : 1;
      updated = [...rewards, { ...formData, id: newId }];
    }

    setRewards(updated);
    localStorage.setItem('rewards', JSON.stringify(updated));
    setShowModal(false);
  };

  const categoryCounts = rewards.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, { Gold: 0, Silver: 0, Bronze: 0 });

  const classLabels = Array.from({ length: 6 }, (_, i) => `Class ${i + 7}`);
  const rewardCountsByClass = classLabels.map(cls =>
    rewards.filter(r => r.class === cls).length
  );

  const chartData = {
    labels: classLabels,
    datasets: [{
      label: 'Rewards Distribution',
      data: rewardCountsByClass,
      backgroundColor: '#FF9800'
    }]
  };

  return (
    <>
      {error && <Alert variant="warning">{error}</Alert>}

      <Row className="mb-4">
        <Col md={8}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Rewards Distribution</Card.Title>
              <div style={{ height: '300px' }}>
                <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center shadow">
            <Card.Body>
              <Card.Title>Reward Categories</Card.Title>
              <ListGroup>
                <ListGroup.Item>
                  <Badge bg="warning" className="me-2">Gold</Badge> {categoryCounts.Gold}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Badge bg="secondary" className="me-2">Silver</Badge> {categoryCounts.Silver}
                </ListGroup.Item>
                <ListGroup.Item>
                  <Badge bg="danger" className="me-2">Bronze</Badge> {categoryCounts.Bronze}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="text-center shadow">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>Recent Rewards</Card.Title>
            <Button size="sm" variant="primary" onClick={openAddModal}>+ Add Reward</Button>
          </div>

          <Table hover responsive>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Type</th><th>Category</th>
                <th>Reward</th><th>Date</th><th>Class</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rewards.length > 0 ? rewards.map(reward => (
                <tr key={reward.id}>
                  <td>{reward.id}</td>
                  <td>{reward.name}</td>
                  <td>{reward.type}</td>
                  <td>
                    <Badge bg={
                      reward.category === 'Gold' ? 'warning' :
                        reward.category === 'Silver' ? 'secondary' : 'danger'
                    }>
                      {reward.category}
                    </Badge>
                  </td>
                  <td>{reward.reward}</td>
                  <td>{reward.date}</td>
                  <td>{reward.class}</td>
                  <td>
                    <Button size="sm" variant="outline-success" onClick={() => openEditModal(reward)}>Edit</Button>{' '}
                    <Button size="sm" variant="outline-danger" onClick={() => handleDelete(reward.id)}>Delete</Button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-muted">No rewards available.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Reward' : 'Add Reward'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                <option value="">Select</option>
                <option>Student</option>
                <option>Parent</option>
                <option>Vendor</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Category</Form.Label>
              <Form.Select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                <option value="">Select</option>
                <option>Gold</option>
                <option>Silver</option>
                <option>Bronze</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Reward</Form.Label>
              <Form.Control value={formData.reward} onChange={(e) => setFormData({ ...formData, reward: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Date</Form.Label>
              <Form.Control type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Class</Form.Label>
              <Form.Select value={formData.class} onChange={(e) => setFormData({ ...formData, class: e.target.value })}>
                <option value="">Select</option>
                <option>Class 7</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
                <option>Class 11</option>
                <option>Class 12</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Rewards;
