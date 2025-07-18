import React, { useState, useEffect } from 'react';
import { Card, Table, Badge, Button, Form, Modal, Alert } from 'react-bootstrap';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [error] = useState('');

  // ✅ Static ticket data fallback
  const staticTickets = [
    {
      id: 1,
      title: 'Login Issue',
      category: 'Authentication',
      status: 'Open',
      priority: 'High',
      created: '2025-07-15',
      assigned: 'John Doe',
    },
    {
      id: 2,
      title: 'UI Bug on Dashboard',
      category: 'Frontend',
      status: 'In Progress',
      priority: 'Medium',
      created: '2025-07-14',
      assigned: 'Jane Smith',
    },
    {
      id: 3,
      title: 'Data sync delay',
      category: 'Backend',
      status: 'Resolved',
      priority: 'Low',
      created: '2025-07-10',
      assigned: 'Mike Brown',
    }
  ];

  // 🔁 Load tickets from localStorage or static
  useEffect(() => {
    const stored = localStorage.getItem('tickets');
    if (stored) {
      setTickets(JSON.parse(stored));
    } else {
      setTickets(staticTickets);
      localStorage.setItem('tickets', JSON.stringify(staticTickets));
    }
  }, []);

  const handleEdit = (ticket) => {
    setEditingTicket({ ...ticket });
    setEditModal(true);
  };

  const handleSave = () => {
    const updated = tickets.map(t =>
      t.id === editingTicket.id ? editingTicket : t
    );
    setTickets(updated);
    localStorage.setItem('tickets', JSON.stringify(updated));
    setEditModal(false);
  };

  const handleResolve = (ticketId) => {
    const updated = tickets.map(t =>
      t.id === ticketId ? { ...t, status: 'Resolved' } : t
    );
    setTickets(updated);
    localStorage.setItem('tickets', JSON.stringify(updated));
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text('Tickets Report', 14, 10);
    autoTable(doc, {
      head: [['ID', 'Title', 'Category', 'Status', 'Priority', 'Created', 'Assigned']],
      body: tickets.map(t =>
        [t.id, t.title, t.category, t.status, t.priority, t.created, t.assigned]
      ),
      startY: 20,
    });
    doc.save('tickets_report.pdf');
  };

  const filteredTickets = tickets.filter(ticket =>
    ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.priority.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="shadow-sm fade-in mt-4 mx-2 mx-md-4">
      <Card.Body>
        <h4 className="text-center mb-4">🎟️ Ticket Management</h4>

        {error && <Alert variant="warning" className="text-center">{error}</Alert>}

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-3 gap-2">
          <Form.Control
            type="text"
            placeholder="Search tickets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ maxWidth: '100%', minWidth: '200px' }}
          />
          <Button variant="outline-primary" size="sm" onClick={handleExportPDF}>
            Export PDF
          </Button>
        </div>

        <div className="table-responsive">
          <Table hover bordered responsive="sm" className="text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th><th>Title</th><th>Category</th><th>Status</th>
                <th>Priority</th><th>Created</th><th>Assigned</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td className="text-dark fw-semibold">{ticket.title}</td>
                  <td className="text-dark fw-semibold">{ticket.category}</td>
                  <td>
                    <Badge bg={
                      ticket.status === 'Open' ? 'danger' :
                      ticket.status === 'In Progress' ? 'warning' : 'success'
                    }>
                      {ticket.status}
                    </Badge>
                  </td>
                  <td>
                    <Badge bg={
                      ticket.priority === 'High' ? 'danger' :
                      ticket.priority === 'Medium' ? 'warning' : 'secondary'
                    }>
                      {ticket.priority}
                    </Badge>
                  </td>
                  <td>{ticket.created}</td>
                  <td>{ticket.assigned}</td>
                  <td>
                    <div className="d-flex flex-column flex-sm-row justify-content-center gap-2">
                      <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => handleEdit(ticket)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outline-dark"
                        size="sm"
                        onClick={() => handleResolve(ticket.id)}
                      >
                        Resolve
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-muted">No matching tickets found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card.Body>

      {/* Edit Modal */}
      <Modal show={editModal} onHide={() => setEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingTicket && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={editingTicket.title}
                  onChange={(e) => setEditingTicket({ ...editingTicket, title: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={editingTicket.status}
                  onChange={(e) => setEditingTicket({ ...editingTicket, status: e.target.value })}
                >
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Assigned</Form.Label>
                <Form.Control
                  value={editingTicket.assigned}
                  onChange={(e) => setEditingTicket({ ...editingTicket, assigned: e.target.value })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default Tickets;
