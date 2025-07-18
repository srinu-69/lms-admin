import React from 'react';
import { Card } from 'react-bootstrap';

const Payments = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Card className="shadow-sm border-0" style={{ backgroundColor: '#ffffff' }}>
        <Card.Body>
          <h3 className="text-dark mb-0">📄 Payment Records</h3>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Payments;
