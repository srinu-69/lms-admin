// import React, { useState} from 'react';
// import { Row, Col, Card, ListGroup, Badge, Form, Button } from 'react-bootstrap';
// import { FaPhone, FaEnvelope, FaTicketAlt, FaPaperclip } from 'react-icons/fa';
// import axios from 'axios';

// const Support = () => {
//   const [tickets, setTickets] = useState([]);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const [newMessage, setNewMessage] = useState('');
//   const [attachedFile, setAttachedFile] = useState(null);

//   // 🔁 Fetch tickets from backend
//   const fetchTickets = async () => {
//     try {
//       const response = await axios.get('/api/support');
//       setTickets(response.data);
//       if (!selectedTicket) setSelectedTicket(response.data[0]);
//       localStorage.setItem('supportTickets', JSON.stringify(response.data));
//     } catch (err) {
//       console.warn('Fallback to localStorage');
//       const stored = localStorage.getItem('supportTickets');
//       if (stored) {
//         const parsed = JSON.parse(stored);
//         setTickets(parsed);
//         if (!selectedTicket) setSelectedTicket(parsed[0]);
//       }
//     }
//   };

//   // useEffect(() => {
//   //   fetchTickets();
//   //   const interval = setInterval(fetchTickets, 15000); // ⏱ auto-refresh every 15s
//   //   return () => clearInterval(interval);
//   // }, []);

//   const handleOpenTicket = (ticket) => {
//     setSelectedTicket(ticket);
//     setNewMessage('');
//     setAttachedFile(null);
//   };

//   const handleSendMessage = async () => {
//     if (!newMessage.trim() && !attachedFile) return;

//     const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//     const messagePayload = {
//       sender: 'You',
//       message: newMessage,
//       time: currentTime,
//       isAdmin: false,
//       attachment: attachedFile ? attachedFile.name : null,
//     };

//     try {
//       await axios.post(`/api/support/${selectedTicket.id}/messages`, messagePayload);
//       setNewMessage('');
//       setAttachedFile(null);
//       fetchTickets(); // refresh after send
//     } catch (err) {
//       alert('Failed to send message to backend');
//     }
//   };

//   return (
//     <Card className="text-center">
//       <Card.Body>
//         <Row className="justify-content-center">
//           {/* Left: Ticket List */}
//           <Col md={4} className="mb-3">
//             <Card>
//               <Card.Body>
//                 <Card.Title>Support Contacts</Card.Title>
//                 <ListGroup variant="flush">
//                   <ListGroup.Item><FaPhone className="me-2" />Support: +1 (555) 123-4567</ListGroup.Item>
//                   <ListGroup.Item><FaEnvelope className="me-2" />Email: support@edudmin.com</ListGroup.Item>
//                 </ListGroup>
//               </Card.Body>
//             </Card>
//             <Card className="mt-3">
//               <Card.Body>
//                 <Card.Title>Open Tickets</Card.Title>
//                 <ListGroup variant="flush">
//                   {tickets.filter(t => t.status !== 'Resolved').map(ticket => (
//                     <ListGroup.Item
//                       key={ticket.id}
//                       action
//                       active={selectedTicket?.id === ticket.id}
//                       onClick={() => handleOpenTicket(ticket)}
//                     >
//                       <div className="d-flex justify-content-between align-items-center">
//                         <span>#{ticket.id} - {ticket.title}</span>
//                         <Badge bg={
//                           ticket.priority === 'High' ? 'danger' :
//                           ticket.priority === 'Medium' ? 'warning' : 'secondary'}>
//                           {ticket.priority}
//                         </Badge>
//                       </div>
//                     </ListGroup.Item>
//                   ))}
//                 </ListGroup>
//               </Card.Body>
//             </Card>
//           </Col>

//           {/* Right: Chat Section */}
//           <Col md={8} className="mb-3">
//             <Card className="chat-card">
//               <Card.Body>
//                 {selectedTicket ? (
//                   <>
//                     <div className="ticket-header mb-3 text-start">
//                       <h5>Ticket #{selectedTicket.id}: {selectedTicket.title}</h5>
//                       <div className="ticket-meta">
//                         <Badge bg={selectedTicket.status === 'Open' ? 'danger' :
//                                     selectedTicket.status === 'In Progress' ? 'warning' : 'success'}>
//                           {selectedTicket.status}
//                         </Badge>
//                         <span className="ms-2">Priority:
//                           <Badge bg={
//                             selectedTicket.priority === 'High' ? 'danger' :
//                             selectedTicket.priority === 'Medium' ? 'warning' : 'secondary'}
//                             className="ms-1">
//                             {selectedTicket.priority}
//                           </Badge>
//                         </span>
//                         <span className="ms-2">Created: {selectedTicket.created}</span>
//                       </div>
//                       <div className="ticket-problem mt-2 p-3 bg-light rounded">
//                         <strong>Problem:</strong> {selectedTicket.problem}
//                       </div>
//                     </div>

//                     <div className="chat-messages text-start mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
//                       {selectedTicket.messages.map(msg => (
//                         <div key={msg.id} className={`message mb-2 ${msg.isAdmin ? 'text-end' : 'text-start'}`}>
//                           <div>
//                             <strong>{msg.sender}</strong>
//                             <small className="text-muted ms-2">{msg.time}</small>
//                           </div>
//                           <div className="message-content bg-light p-2 rounded">{msg.message}</div>
//                         </div>
//                       ))}
//                     </div>

//                     <Form>
//                       <Form.Group className="mb-2">
//                         <Form.Control
//                           as="textarea"
//                           rows={2}
//                           placeholder="Type your message here..."
//                           value={newMessage}
//                           onChange={(e) => setNewMessage(e.target.value)}
//                         />
//                       </Form.Group>
//                       <Form.Group className="mb-2 d-flex align-items-center justify-content-between">
//                         <div>
//                           <Form.Label className="btn btn-outline-secondary btn-sm mb-0">
//                             <FaPaperclip className="me-1" /> Attach File
//                             <Form.Control
//                               type="file"
//                               hidden
//                               onChange={(e) => setAttachedFile(e.target.files[0])}
//                             />
//                           </Form.Label>
//                           {attachedFile && (
//                             <span className="ms-2 text-muted">{attachedFile.name}</span>
//                           )}
//                         </div>
//                         <Button variant="primary" size="sm" onClick={handleSendMessage}>
//                           Send
//                         </Button>
//                       </Form.Group>
//                     </Form>
//                   </>
//                 ) : (
//                   <div className="no-ticket-selected d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
//                     <div className="text-center">
//                       <FaTicketAlt size={48} className="mb-3 text-muted" />
//                       <h5>No Ticket Selected</h5>
//                       <p>Please select a ticket from the list to view messages</p>
//                     </div>
//                   </div>
//                 )}
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Support;


import React, { useState, useEffect } from 'react';
import { Row, Col, Card, ListGroup, Badge, Form, Button } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaTicketAlt, FaPaperclip } from 'react-icons/fa';
// import axios from 'axios';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Simulate fade-in animation trigger
    setTimeout(() => setFadeIn(true), 100);

    // Simulated fetch
    const stored = localStorage.getItem('supportTickets');
    if (stored) {
      const parsed = JSON.parse(stored);
      setTickets(parsed);
      setSelectedTicket(parsed[0]);
    }
  }, []);

  const handleOpenTicket = (ticket) => {
    setSelectedTicket(ticket);
    setNewMessage('');
    setAttachedFile(null);
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() && !attachedFile) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messagePayload = {
      sender: 'You',
      message: newMessage,
      time: currentTime,
      isAdmin: false,
      attachment: attachedFile ? attachedFile.name : null,
    };

    const updatedTickets = tickets.map(ticket =>
      ticket.id === selectedTicket.id
        ? {
            ...ticket,
            messages: [...ticket.messages, { id: Date.now(), ...messagePayload }]
          }
        : ticket
    );

    setTickets(updatedTickets);
    setSelectedTicket(updatedTickets.find(t => t.id === selectedTicket.id));
    localStorage.setItem('supportTickets', JSON.stringify(updatedTickets));
    setNewMessage('');
    setAttachedFile(null);
  };

  const fadeStyle = {
    opacity: fadeIn ? 1 : 0,
    transform: fadeIn ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.6s ease-in-out'
  };

  return (
    <div style={fadeStyle}>
      <Card className="text-center shadow" style={fadeStyle}>
        <Card.Body>
          <Row className="justify-content-center">
            {/* Left Column */}
            <Col md={4} className="mb-3" style={fadeStyle}>
              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Support Contacts</Card.Title>
                  <ListGroup variant="flush">
                    <ListGroup.Item><FaPhone className="me-2" />Support: +1 (555) 123-4567</ListGroup.Item>
                    <ListGroup.Item><FaEnvelope className="me-2" />Email: support@edudmin.com</ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>

              <Card>
                <Card.Body>
                  <Card.Title>Open Tickets</Card.Title>
                  <ListGroup variant="flush" style={{ maxHeight: '250px', overflowY: 'auto' }}>
                    {tickets.filter(t => t.status !== 'Resolved').map(ticket => (
                      <ListGroup.Item
                        key={ticket.id}
                        action
                        active={selectedTicket?.id === ticket.id}
                        onClick={() => handleOpenTicket(ticket)}
                      >
                        <div className="d-flex justify-content-between align-items-center">
                          <span>#{ticket.id} - {ticket.title}</span>
                          <Badge bg={
                            ticket.priority === 'High' ? 'danger' :
                            ticket.priority === 'Medium' ? 'warning' : 'secondary'}>
                            {ticket.priority}
                          </Badge>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>

            {/* Right Column */}
            <Col md={8} className="mb-3" style={fadeStyle}>
              <Card className="shadow">
                <Card.Body>
                  {selectedTicket ? (
                    <>
                      <div className="text-start mb-3">
                        <h5>Ticket #{selectedTicket.id}: {selectedTicket.title}</h5>
                        <div>
                          <Badge bg={
                            selectedTicket.status === 'Open' ? 'danger' :
                            selectedTicket.status === 'In Progress' ? 'warning' : 'success'}>
                            {selectedTicket.status}
                          </Badge>
                          <span className="ms-2">Priority:
                            <Badge bg={
                              selectedTicket.priority === 'High' ? 'danger' :
                              selectedTicket.priority === 'Medium' ? 'warning' : 'secondary'}
                              className="ms-1">
                              {selectedTicket.priority}
                            </Badge>
                          </span>
                          <span className="ms-2">Created: {selectedTicket.created}</span>
                        </div>
                        <div className="mt-2 p-2 bg-light rounded">
                          <strong>Problem:</strong> {selectedTicket.problem}
                        </div>
                      </div>

                      <div className="chat-messages text-start mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                        {selectedTicket.messages.map((msg, i) => (
                          <div key={i} style={{
                            ...fadeStyle,
                            transitionDelay: `${i * 100}ms`
                          }}>
                            <div className={`mb-2 ${msg.isAdmin ? 'text-end' : 'text-start'}`}>
                              <strong>{msg.sender}</strong>
                              <small className="text-muted ms-2">{msg.time}</small>
                              <div className="bg-light p-2 rounded mt-1">{msg.message}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <Form>
                        <Form.Group className="mb-2">
                          <Form.Control
                            as="textarea"
                            rows={2}
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group className="mb-2 d-flex align-items-center justify-content-between">
                          <div>
                            <Form.Label className="btn btn-outline-secondary btn-sm mb-0">
                              <FaPaperclip className="me-1" /> Attach File
                              <Form.Control
                                type="file"
                                hidden
                                onChange={(e) => setAttachedFile(e.target.files[0])}
                              />
                            </Form.Label>
                            {attachedFile && (
                              <span className="ms-2 text-muted">{attachedFile.name}</span>
                            )}
                          </div>
                          <Button variant="primary" size="sm" onClick={handleSendMessage}>
                            Send
                          </Button>
                        </Form.Group>
                      </Form>
                    </>
                  ) : (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
                      <div className="text-center" style={fadeStyle}>
                        <FaTicketAlt size={48} className="mb-3 text-muted" />
                        <h5>No Ticket Selected</h5>
                        <p>Please select a ticket from the list</p>
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Support;
