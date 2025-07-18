import React, { useState, useEffect } from 'react';

const staticActivities = [
  {
    id: 1,
    time: '10:00 AM',
    action: 'User <strong>John</strong> logged in',
    details: 'User <b>John Doe</b> from IP 192.168.1.1 logged into the system.',
  },
  {
    id: 2,
    time: '10:30 AM',
    action: 'File uploaded: <i>report.pdf</i>',
    details: 'The report was uploaded using the document manager.',
  },
  {
    id: 3,
    time: '11:00 AM',
    action: '⚠️ <span style="color:red">Potential XSS</span> - <script>alert("XSS");</script>',
    details: 'This is a test entry showing what happens when unsafe HTML is rendered.',
  },
];

const blinkAnimationStyle = `
@keyframes blink {
  0% { background-color: #fff; }
  50% { background-color: #e6f7ff; }
  100% { background-color: #fff; }
}
.blink {
  animation: blink 1s ease-in-out;
}
`;

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = blinkAnimationStyle;
    document.head.appendChild(style);

    setTimeout(() => {
      setActivities(staticActivities);
      setLoading(false);
      setTimeout(() => setFadeIn(true), 100); // Fade-in effect trigger
    }, 1000);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleView = (activity) => {
    setSelectedActivity(activity);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedActivity(null);
    setShowModal(false);
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '16px',
        margin: '20px auto',
        maxWidth: '600px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        fontFamily: 'Arial, sans-serif',
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 0.6s ease-in',
      }}
    >
      <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>📌 Recent Activity</h3>

      {loading ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="blink"
              style={{
                borderBottom: '1px solid #eee',
                padding: '12px 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ color: '#888', fontSize: '14px', marginBottom: '4px' }}>
                  {activity.time}
                </div>
                <div
                  style={{ fontSize: '16px' }}
                  dangerouslySetInnerHTML={{ __html: activity.action }}
                />
              </div>
              <button
                onClick={() => handleView(activity)}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
              >
                View
              </button>
            </li>
          ))}
          {activities.length === 0 && (
            <li style={{ textAlign: 'center', color: '#888' }}>No recent activity.</li>
          )}
        </ul>
      )}

      {/* Modal */}
      {showModal && selectedActivity && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '500px',
              padding: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            <h4 style={{ marginBottom: '10px' }}>Activity Details</h4>
            <div
              style={{ fontSize: '16px', marginBottom: '10px' }}
              dangerouslySetInnerHTML={{ __html: selectedActivity.action }}
            />
            <p><strong>Time:</strong> {selectedActivity.time}</p>
            <hr />
            <div
              dangerouslySetInnerHTML={{ __html: selectedActivity.details }}
              style={{ fontSize: '15px' }}
            />
            <button
              onClick={handleCloseModal}
              style={{
                marginTop: '15px',
                backgroundColor: '#dc3545',
                color: 'white',
                padding: '8px 16px',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;
