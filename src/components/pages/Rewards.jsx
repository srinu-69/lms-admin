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
import axios from 'axios';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Rewards = () => {
  const [rewards, setRewards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    id: null, name: '', type: '', category: '', reward: '', date: '', class: ''
  });

  // 🚀 Load rewards from backend or localStorage
  const fetchRewards = async () => {
    try {
      const res = await axios.get('/api/rewards');
      setRewards(res.data);
      localStorage.setItem('rewards', JSON.stringify(res.data));
      setError('');
    } catch {
      const stored = localStorage.getItem('rewards');
      if (stored) {
        setRewards(JSON.parse(stored));
        setError('⚠️ Loaded from localStorage. Backend not available.');
      } else {
        setError('❌ Failed to load rewards.');
      }
    }
  };

  useEffect(() => {
    fetchRewards();
    const interval = setInterval(fetchRewards, 30000); // auto-refresh every 30s
    return () => clearInterval(interval);
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

  const handleDelete = async (id) => {
    const updated = rewards.filter(r => r.id !== id);
    setRewards(updated);
    localStorage.setItem('rewards', JSON.stringify(updated));
    try {
      await axios.delete(`/api/rewards/${id}`);
    } catch {
      console.warn('Backend delete failed. Local copy updated.');
    }
  };

  const handleSave = async () => {
    if (!formData.name || !formData.type || !formData.category || !formData.reward || !formData.date || !formData.class) {
      alert('Please fill all fields');
      return;
    }

    if (editMode) {
      const updated = rewards.map(r => (r.id === formData.id ? formData : r));
      setRewards(updated);
      try {
        await axios.put(`/api/rewards/${formData.id}`, formData);
      } catch {
        console.warn('Backend update failed.');
      }
    } else {
      const newId = rewards.length ? Math.max(...rewards.map(r => r.id)) + 1 : 1;
      const newReward = { ...formData, id: newId };
      setRewards([...rewards, newReward]);
      try {
        await axios.post(`/api/rewards`, newReward);
      } catch {
        console.warn('Backend add failed.');
      }
    }

    localStorage.setItem('rewards', JSON.stringify(rewards));
    setShowModal(false);
  };

  const categoryCounts = rewards.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, { Gold: 0, Silver: 0, Bronze: 0 });

  const classLabels = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  const rewardCountsByClass = classLabels.map(cls =>
    rewards.filter(r => r.class === cls).length
  );

  const classPerformanceData = {
    labels: classLabels,
    datasets: [{
      label: 'Rewards Distribution',
      data: rewardCountsByClass,
      backgroundColor: '#FFC107'
    }]
  };

  return (
    <>
      {error && <Alert variant="warning" className="text-center">{error}</Alert>}

      <Row className="mb-4 justify-content-center">
        <Col md={8} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Rewards Distribution</Card.Title>
              <div style={{ height: '300px' }}>
                <Bar data={classPerformanceData} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Reward Categories</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Badge bg="warning" className="me-2">Gold</Badge> {categoryCounts.Gold || 0} Rewards
                </ListGroup.Item>
                <ListGroup.Item>
                  <Badge bg="secondary" className="me-2">Silver</Badge> {categoryCounts.Silver || 0} Rewards
                </ListGroup.Item>
                <ListGroup.Item>
                  <Badge bg="danger" className="me-2">Bronze</Badge> {categoryCounts.Bronze || 0} Rewards
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="text-center">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title className="mb-0">Recent Rewards</Card.Title>
            <Button size="sm" variant="primary" onClick={openAddModal}>+ Add Reward</Button>
          </div>
          <Table hover responsive className="text-center">
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>Type</th><th>Category</th>
                <th>Reward</th><th>Date</th><th>Class</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rewards.map(reward => (
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
              ))}
              {rewards.length === 0 && (
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
              <Form.Control value={formData.class} onChange={(e) => setFormData({ ...formData, class: e.target.value })} />
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
