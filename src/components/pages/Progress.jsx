import React, { useState } from 'react';
import {
  Card, Table, Badge, Row, Col, Form, InputGroup, Button, Modal, Alert
} from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

const subjects = ['Math', 'Science', 'English', 'History'];

const fadeInStyle = {
  opacity: 0,
  transform: 'translateY(30px)',
  transition: 'opacity 0.6s ease, transform 0.6s ease'
};

// Utility to generate random student data
const generateStudent = (id, name) => {
  const scores = {
    Math: Math.floor(Math.random() * 41) + 60, // 60–100
    Science: Math.floor(Math.random() * 41) + 60,
    English: Math.floor(Math.random() * 41) + 60,
    History: Math.floor(Math.random() * 41) + 60
  };
  const average = Math.round(
    (scores.Math + scores.Science + scores.English + scores.History) / 4
  );
  const topSubject = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  );
  const improvement = Math.floor(Math.random() * 21); // 0–20%
  return { id, name, scores, average, topSubject, improvement };
};

// Generate static data for Class 1–12
const staticData = Array.from({ length: 12 }, (_, classIndex) => {
  const className = `Class ${classIndex + 1}`;
  const students = Array.from({ length: 4 }, (_, sIdx) =>
    generateStudent(
      `S${classIndex + 1}${sIdx + 1}`,
      `Student${classIndex + 1}${sIdx + 1}`
    )
  );
  return { className, students };
});

const calcSubjectAvg = (students) => {
  const avg = {};
  subjects.forEach(sub => {
    avg[sub] = Math.round(students.reduce((sum, s) => sum + s.scores[sub], 0) / students.length);
  });
  return avg;
};

const Progress = () => {
  const [classData, setClassData] = useState(staticData);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [ setEditClassIdx] = useState(null);

  const filtered = classData.map((cls, idx) => {
    const students = cls.students.filter(s =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchClass = cls.className.toLowerCase().includes(searchTerm.toLowerCase());
    return {
      ...cls,
      students: matchClass ? cls.students : students,
      subjectAverages: calcSubjectAvg(matchClass ? cls.students : students)
    };
  }).filter(cls => cls.students.length || !searchTerm);

  const handleDelete = (classIdx, studentId) => {
    const updated = classData.map((cls, idx) => {
      if (idx === classIdx) {
        return {
          ...cls,
          students: cls.students.filter(s => s.id !== studentId)
        };
      }
      return cls;
    });
    setClassData(updated);
  };

  const handleSave = () => {
    setEditModal(false);
  };

  return (
    <div className="p-3">
      <Alert variant="info" className="text-center">📊 Static Progress Data: Class 7 to 12</Alert>

      <InputGroup className="mb-4 w-50 mx-auto">
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control
          placeholder="Search by student ID, name, or class..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {filtered.map((cls, idx) => (
        <div key={idx} style={fadeInStyle} className="mb-5" onLoad={e => e.currentTarget.style.opacity = 1}>
          <Card className="shadow">
            <Card.Body>
              <h3 className="text-center mb-4">{cls.className} - Progress</h3>
              <Row className="mb-4">
                <Col>
                  <div style={{ height: '300px' }}>
                    <Bar
                      data={{
                        labels: subjects,
                        datasets: [{
                          label: 'Average Score',
                          data: subjects.map(sub => cls.subjectAverages[sub]),
                          backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545']
                        }]
                      }}
                      options={{ responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100 } } }}
                    />
                  </div>
                </Col>
              </Row>
              <Table hover responsive bordered>
                <thead>
                  <tr>
                    <th>ID</th><th>Name</th>
                    {subjects.map(s => <th key={s}>{s}</th>)}
                    <th>Average</th><th>Top Subject</th><th>Improvement</th><th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cls.students.map(s => (
                    <tr key={s.id}>
                      <td>{s.id}</td><td>{s.name}</td>
                      {subjects.map(sub => <td key={sub}>{s.scores[sub]}%</td>)}
                      <td><strong>{s.average}%</strong></td>
                      <td>{s.topSubject}</td>
                      <td><Badge bg={s.improvement > 10 ? 'success' : 'warning'}>{s.improvement}%</Badge></td>
                      <td>
                        <Button size="sm" variant="info" onClick={() => { setEditStudent(s); setEditClassIdx(idx); setEditModal(true); }}>
                          <FaEdit />
                        </Button>{' '}
                        <Button size="sm" variant="danger" onClick={() => handleDelete(idx, s.id)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      ))}

      <Modal show={editModal} centered onHide={() => setEditModal(false)}>
        <Modal.Header closeButton><Modal.Title>Edit Student</Modal.Title></Modal.Header>
        <Modal.Body>
          {editStudent && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control value={editStudent.name} disabled />
              </Form.Group>
              {subjects.map(sub => (
                <Form.Group key={sub} className="mb-2">
                  <Form.Label>{sub} Score</Form.Label>
                  <Form.Control type="number" min="0" max="100" value={editStudent.scores[sub]} disabled />
                </Form.Group>
              ))}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Progress;
