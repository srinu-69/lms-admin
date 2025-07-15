import React, { useEffect, useState } from 'react';
import {
  Card, Table, Badge, Button, Form, InputGroup, Alert
} from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  // 📡 Fetch from backend or fallback to localStorage
  const fetchPayments = async () => {
    try {
      const res = await axios.get('/api/payments'); // 🔁 Replace with your backend API
      setPayments(res.data);
      localStorage.setItem('paymentData', JSON.stringify(res.data));
      setError('');
    } catch (err) {
      const storedData = localStorage.getItem('paymentData');
      if (storedData) {
        setPayments(JSON.parse(storedData));
        setError('⚠️ Showing offline data. Backend unreachable.');
      } else {
        setPayments([]);
        setError('❌ Failed to load data. Backend and local cache unavailable.');
      }
    }
  };

  // 📥 Initial + auto-refresh
  useEffect(() => {
    fetchPayments();
    const interval = setInterval(fetchPayments, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  // 📤 Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Payment History Report', 14, 22);

    const headers = ["ID", "Name", "Subject", "Amount", "Status", "Date"];
    const data = filteredPayments.map(p => [
      p.id,
      p.name,
      p.subject,
      `₹${p.amount}`,
      p.status,
      p.date
    ]);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 30
    });

    doc.save('payment-history.pdf');
  };

  // 🔍 Search Filter
  const filteredPayments = payments.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.subject.toLowerCase().includes(search.toLowerCase()) ||
    p.status.toLowerCase().includes(search.toLowerCase())
  );

  // 🗑️ Delete Payment (local only for now)
  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this record?');
    if (confirm) {
      const updated = payments.filter(p => p.id !== id);
      setPayments(updated);
      localStorage.setItem('paymentData', JSON.stringify(updated));

      // Optional: Sync with backend
      try {
        await axios.delete(`/api/payments/${id}`);
      } catch (err) {
        alert('Failed to delete from backend.');
      }
    }
  };

  // ✏️ Edit (to be implemented)
  const handleEdit = (payment) => {
    alert('Edit functionality not implemented.');
  };

  return (
    <Card className="text-center fade-in mt-4 mx-2 mx-md-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="w-100 text-center">💳 Payment History</h3>
          <Button variant="primary" size="sm" onClick={exportToPDF}>Export PDF</Button>
        </div>

        {error && <Alert variant="warning">{error}</Alert>}

        <Form className="mb-3">
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search by name, subject, status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Form>

        <Table hover responsive className="text-center table-striped">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.name}</td>
                  <td>{payment.subject}</td>
                  <td>₹{payment.amount}</td>
                  <td>
                    <Badge bg={
                      payment.status === 'Success' ? 'success' :
                      payment.status === 'Pending' ? 'warning' : 'danger'
                    }>
                      {payment.status}
                    </Badge>
                  </td>
                  <td>{payment.date}</td>
                  <td>
                    <Button size="sm" variant="info" onClick={() => handleEdit(payment)}>Edit</Button>{' '}
                    <Button size="sm" variant="danger" onClick={() => handleDelete(payment.id)}>Delete</Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-muted">No matching records found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default Payments;
