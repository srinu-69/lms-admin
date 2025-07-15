import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Modal, Spinner } from 'react-bootstrap';
import axios from 'axios';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  // 🔁 Fetch recent activity from backend
  const fetchActivities = async () => {
    try {
      const response = await axios.get('https://your-backend-api.com/api/recent-activities'); // Replace with your actual endpoint
      setActivities(response.data); // Make sure response.data is an array
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(); // Load once
    const interval = setInterval(fetchActivities, 10000); // 🔁 Auto-refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleView = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  return (
    <>
      <Card className="text-center shadow-sm fade-in">
        <Card.Header>
          <h4 className="animated-heading mb-0">📌 Recent Activity</h4>
        </Card.Header>
        <Card.Body className="p-0">
          {loading ? (
            <div className="p-3 text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <ListGroup variant="flush">
              {activities.map((activity) => (
                <ListGroup.Item
                  key={activity.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <div className="me-3 text-muted">{activity.time}</div>
                    <div>{activity.action}</div>
                  </div>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleView(activity)}
                  >
                    View
                  </Button>
                </ListGroup.Item>
              ))}
              {activities.length === 0 && (
                <ListGroup.Item className="text-muted text-center">
                  No recent activity.
                </ListGroup.Item>
              )}
            </ListGroup>
          )}
        </Card.Body>
      </Card>

      {/* Modal to show activity details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Activity Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedActivity && (
            <>
              <h5>{selectedActivity.action}</h5>
              <p><strong>Time:</strong> {selectedActivity.time}</p>
              <hr />
              <p>{selectedActivity.details}</p>
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

export default RecentActivity;
