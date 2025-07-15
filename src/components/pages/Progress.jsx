// // import React, { useEffect, useState } from 'react';
// // import {
// //   Card, Table, Badge, Row, Col, Form, InputGroup, Button, Modal, Alert
// // } from 'react-bootstrap';
// // import { Bar } from 'react-chartjs-2';
// // import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
// // import axios from 'axios';
// // import {
// //   Chart as ChartJS,
// //   BarElement,
// //   CategoryScale,
// //   LinearScale,
// //   Legend,
// //   Tooltip
// // } from 'chart.js';

// // ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

// // const subjects = ['Math', 'Science', 'English', 'History'];

// // const Progress = () => {
// //   const [classData, setClassData] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [editModal, setEditModal] = useState(false);
// //   const [editStudent, setEditStudent] = useState(null);
// //   const [editClassIndex, setEditClassIndex] = useState(null);
// //   const [error, setError] = useState('');

// //   // 📦 Fetch from backend or fallback to localStorage
// //   const fetchProgressData = async () => {
// //     try {
// //       const res = await axios.get('/api/class-progress');
// //       setClassData(res.data);
// //       localStorage.setItem('progressClassData', JSON.stringify(res.data));
// //       setError('');
// //     } catch {
// //       const stored = localStorage.getItem('progressClassData');
// //       if (stored) {
// //         setClassData(JSON.parse(stored));
// //         setError('⚠️ Backend unreachable. Loaded from localStorage.');
// //       } else {
// //         setError('❌ No data available.');
// //       }
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProgressData();
// //     const interval = setInterval(fetchProgressData, 30000); // every 30s
// //     return () => clearInterval(interval);
// //   }, []);

// //   const calcSubjectAvg = (students) => {
// //     const avg = {};
// //     subjects.forEach(sub => {
// //       avg[sub] = Math.round(students.reduce((sum, s) => sum + s.scores[sub], 0) / students.length);
// //     });
// //     return avg;
// //   };

// //   const handleEdit = (student, classIndex) => {
// //     setEditStudent({ ...student });
// //     setEditClassIndex(classIndex);
// //     setEditModal(true);
// //   };

// //   const handleDelete = async (studentId, classIndex) => {
// //     const updatedClassData = [...classData];
// //     const classId = updatedClassData[classIndex].className;

// //     updatedClassData[classIndex].students = updatedClassData[classIndex].students.filter(s => s.id !== studentId);
// //     updatedClassData[classIndex].subjectAverages = calcSubjectAvg(updatedClassData[classIndex].students);

// //     setClassData(updatedClassData);
// //     localStorage.setItem('progressClassData', JSON.stringify(updatedClassData));

// //     try {
// //       await axios.delete(`/api/class-progress/${classId}/student/${studentId}`);
// //     } catch {
// //       console.warn('Delete failed on backend. Saved locally.');
// //     }
// //   };

// //   const handleSaveEdit = async () => {
// //     const updatedClassData = [...classData];
// //     const classId = updatedClassData[editClassIndex].className;
// //     const updatedStudents = updatedClassData[editClassIndex].students.map(s =>
// //       s.id === editStudent.id ? {
// //         ...editStudent,
// //         average: Math.round(Object.values(editStudent.scores).reduce((a, b) => a + b) / subjects.length),
// //         topSubject: Object.entries(editStudent.scores).sort((a, b) => b[1] - a[1])[0][0]
// //       } : s
// //     );
// //     updatedClassData[editClassIndex].students = updatedStudents;
// //     updatedClassData[editClassIndex].subjectAverages = calcSubjectAvg(updatedStudents);

// //     setClassData(updatedClassData);
// //     localStorage.setItem('progressClassData', JSON.stringify(updatedClassData));
// //     setEditModal(false);

// //     try {
// //       await axios.put(`/api/class-progress/${classId}/student/${editStudent.id}`, editStudent);
// //     } catch {
// //       console.warn('Edit failed on backend. Saved locally.');
// //     }
// //   };

// //   const filteredClassData = classData
// //     .map(classItem => {
// //       const filteredStudents = classItem.students.filter(student =>
// //         student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         student.id.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //       const classMatches = classItem.className.toLowerCase().includes(searchTerm.toLowerCase());

// //       return {
// //         ...classItem,
// //         students: classMatches ? classItem.students : filteredStudents
// //       };
// //     })
// //     .filter(classItem => classItem.students.length > 0 || searchTerm === '');

// //   return (
// //     <div className="p-3">
// //       {error && <Alert variant="warning" className="text-center">{error}</Alert>}
// //       <InputGroup className="mb-4 w-50 mx-auto">
// //         <InputGroup.Text><FaSearch /></InputGroup.Text>
// //         <Form.Control
// //           placeholder="Search by student name, ID or class name..."
// //           value={searchTerm}
// //           onChange={(e) => setSearchTerm(e.target.value)}
// //         />
// //       </InputGroup>

// //       {filteredClassData.map(({ className, students, subjectAverages }, idx) => (
// //         <Card key={idx} className="mb-5 shadow-sm">
// //           <Card.Body>
// //             <h3 className="text-center mb-4">{className} - Student Progress</h3>
// //             <Row className="mb-4">
// //               <Col>
// //                 <div style={{ height: '300px' }}>
// //                   <Bar
// //                     data={{
// //                       labels: subjects,
// //                       datasets: [{
// //                         label: 'Average Score',
// //                         data: subjects.map(sub => subjectAverages[sub]),
// //                         backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545']
// //                       }]
// //                     }}
// //                     options={{
// //                       responsive: true,
// //                       maintainAspectRatio: false,
// //                       scales: { y: { beginAtZero: true, max: 100 } }
// //                     }}
// //                   />
// //                 </div>
// //               </Col>
// //             </Row>
// //             <Table hover responsive bordered>
// //               <thead>
// //                 <tr>
// //                   <th>ID</th>
// //                   <th>Name</th>
// //                   {subjects.map(sub => <th key={sub}>{sub}</th>)}
// //                   <th>Average</th>
// //                   <th>Top Subject</th>
// //                   <th>Improvement</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {students.map((student) => (
// //                   <tr key={student.id}>
// //                     <td>{student.id}</td>
// //                     <td>{student.name}</td>
// //                     {subjects.map(sub => <td key={sub}>{student.scores[sub]}%</td>)}
// //                     <td><strong>{student.average}%</strong></td>
// //                     <td>{student.topSubject}</td>
// //                     <td>
// //                       <Badge bg={student.improvement > 10 ? 'success' : 'warning'}>
// //                         {student.improvement}%
// //                       </Badge>
// //                     </td>
// //                     <td>
// //                       <Button size="sm" variant="info" onClick={() => handleEdit(student, idx)} className="me-2">
// //                         <FaEdit />
// //                       </Button>
// //                       <Button size="sm" variant="danger" onClick={() => handleDelete(student.id, idx)}>
// //                         <FaTrash />
// //                       </Button>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </Table>
// //           </Card.Body>
// //         </Card>
// //       ))}

// //       {/* ✏️ Edit Modal */}
// //       <Modal show={editModal} onHide={() => setEditModal(false)} centered>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Edit Student</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           {editStudent && (
// //             <Form>
// //               <Form.Group className="mb-2">
// //                 <Form.Label>Name</Form.Label>
// //                 <Form.Control
// //                   value={editStudent.name}
// //                   onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
// //                 />
// //               </Form.Group>
// //               {subjects.map(sub => (
// //                 <Form.Group key={sub} className="mb-2">
// //                   <Form.Label>{sub} Score</Form.Label>
// //                   <Form.Control
// //                     type="number"
// //                     min="0"
// //                     max="100"
// //                     value={editStudent.scores[sub]}
// //                     onChange={(e) =>
// //                       setEditStudent({
// //                         ...editStudent,
// //                         scores: {
// //                           ...editStudent.scores,
// //                           [sub]: parseInt(e.target.value) || 0
// //                         }
// //                       })
// //                     }
// //                   />
// //                 </Form.Group>
// //               ))}
// //             </Form>
// //           )}
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
// //           <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default Progress;


// import React, { useEffect, useState } from 'react';
// import {
//   Card, Table, Badge, Row, Col, Form, InputGroup, Button, Modal, Alert
// } from 'react-bootstrap';
// import { Bar } from 'react-chartjs-2';
// import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import {
//   Chart as ChartJS,
//   BarElement,
//   CategoryScale,
//   LinearScale,
//   Legend,
//   Tooltip
// } from 'chart.js';

// ChartJS.register(BarElement, CategoryScale, LinearScale, Legend, Tooltip);

// const subjects = ['Math', 'Science', 'English', 'History'];

// const cardVariants = {
//   hidden: { opacity: 0, y: 30 },
//   visible: i => ({
//     opacity: 1,
//     y: 0,
//     transition: {
//       delay: i * 0.2,
//       duration: 0.6,
//       type: 'spring'
//     }
//   })
// };

// const Progress = () => {
//   const [classData, setClassData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [editModal, setEditModal] = useState(false);
//   const [editStudent, setEditStudent] = useState(null);
//   const [editClassIndex, setEditClassIndex] = useState(null);
//   const [error, setError] = useState('');

//   const fetchProgressData = async () => {
//     try {
//       const res = await axios.get('/api/class-progress');
//       setClassData(res.data);
//       localStorage.setItem('progressClassData', JSON.stringify(res.data));
//       setError('');
//     } catch {
//       const stored = localStorage.getItem('progressClassData');
//       if (stored) {
//         setClassData(JSON.parse(stored));
//         setError('⚠️ Backend unreachable. Loaded from localStorage.');
//       } else {
//         setError('❌ No data available.');
//       }
//     }
//   };

//   useEffect(() => {
//     fetchProgressData();
//     const interval = setInterval(fetchProgressData, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const calcSubjectAvg = (students) => {
//     const avg = {};
//     subjects.forEach(sub => {
//       avg[sub] = Math.round(students.reduce((sum, s) => sum + s.scores[sub], 0) / students.length);
//     });
//     return avg;
//   };

//   const handleEdit = (student, classIndex) => {
//     setEditStudent({ ...student });
//     setEditClassIndex(classIndex);
//     setEditModal(true);
//   };

//   const handleDelete = async (studentId, classIndex) => {
//     const updatedClassData = [...classData];
//     const classId = updatedClassData[classIndex].className;

//     updatedClassData[classIndex].students = updatedClassData[classIndex].students.filter(s => s.id !== studentId);
//     updatedClassData[classIndex].subjectAverages = calcSubjectAvg(updatedClassData[classIndex].students);

//     setClassData(updatedClassData);
//     localStorage.setItem('progressClassData', JSON.stringify(updatedClassData));

//     try {
//       await axios.delete(`/api/class-progress/${classId}/student/${studentId}`);
//     } catch {
//       console.warn('Delete failed on backend. Saved locally.');
//     }
//   };

//   const handleSaveEdit = async () => {
//     const updatedClassData = [...classData];
//     const classId = updatedClassData[editClassIndex].className;

//     const updatedStudents = updatedClassData[editClassIndex].students.map(s =>
//       s.id === editStudent.id ? {
//         ...editStudent,
//         average: Math.round(Object.values(editStudent.scores).reduce((a, b) => a + b) / subjects.length),
//         topSubject: Object.entries(editStudent.scores).sort((a, b) => b[1] - a[1])[0][0]
//       } : s
//     );

//     updatedClassData[editClassIndex].students = updatedStudents;
//     updatedClassData[editClassIndex].subjectAverages = calcSubjectAvg(updatedStudents);

//     setClassData(updatedClassData);
//     localStorage.setItem('progressClassData', JSON.stringify(updatedClassData));
//     setEditModal(false);

//     try {
//       await axios.put(`/api/class-progress/${classId}/student/${editStudent.id}`, editStudent);
//     } catch {
//       console.warn('Edit failed on backend. Saved locally.');
//     }
//   };

//   const filteredClassData = classData
//     .map(classItem => {
//       const filteredStudents = classItem.students.filter(student =>
//         student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.id.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//       const classMatches = classItem.className.toLowerCase().includes(searchTerm.toLowerCase());

//       return {
//         ...classItem,
//         students: classMatches ? classItem.students : filteredStudents
//       };
//     })
//     .filter(classItem => classItem.students.length > 0 || searchTerm === '');

//   return (
//     <div className="p-3">
//       {error && <Alert variant="warning" className="text-center">{error}</Alert>}

//       <InputGroup className="mb-4 w-50 mx-auto">
//         <InputGroup.Text><FaSearch /></InputGroup.Text>
//         <Form.Control
//           placeholder="Search by student name, ID or class name..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </InputGroup>

//       {filteredClassData.map(({ className, students, subjectAverages }, idx) => (
//         <motion.div key={idx} custom={idx} initial="hidden" animate="visible" variants={cardVariants}>
//           <Card className="mb-5 shadow">
//             <Card.Body>
//               <h3 className="text-center mb-4">{className} - Student Progress</h3>

//               <Row className="mb-4">
//                 <Col>
//                   <div style={{ height: '300px' }}>
//                     <Bar
//                       data={{
//                         labels: subjects,
//                         datasets: [{
//                           label: 'Average Score',
//                           data: subjects.map(sub => subjectAverages[sub]),
//                           backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545']
//                         }]
//                       }}
//                       options={{
//                         responsive: true,
//                         maintainAspectRatio: false,
//                         scales: { y: { beginAtZero: true, max: 100 } }
//                       }}
//                     />
//                   </div>
//                 </Col>
//               </Row>

//               <Table hover responsive bordered>
//                 <thead>
//                   <tr>
//                     <th>ID</th>
//                     <th>Name</th>
//                     {subjects.map(sub => <th key={sub}>{sub}</th>)}
//                     <th>Average</th>
//                     <th>Top Subject</th>
//                     <th>Improvement</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {students.map((student) => (
//                     <motion.tr key={student.id} whileHover={{ scale: 1.01 }}>
//                       <td>{student.id}</td>
//                       <td>{student.name}</td>
//                       {subjects.map(sub => <td key={sub}>{student.scores[sub]}%</td>)}
//                       <td><strong>{student.average}%</strong></td>
//                       <td>{student.topSubject}</td>
//                       <td>
//                         <Badge bg={student.improvement > 10 ? 'success' : 'warning'}>
//                           {student.improvement}%
//                         </Badge>
//                       </td>
//                       <td>
//                         <Button size="sm" variant="info" onClick={() => handleEdit(student, idx)} className="me-2">
//                           <FaEdit />
//                         </Button>
//                         <Button size="sm" variant="danger" onClick={() => handleDelete(student.id, idx)}>
//                           <FaTrash />
//                         </Button>
//                       </td>
//                     </motion.tr>
//                   ))}
//                 </tbody>
//               </Table>
//             </Card.Body>
//           </Card>
//         </motion.div>
//       ))}

//       {/* ✏️ Modal with animation */}
//       <Modal show={editModal} onHide={() => setEditModal(false)} centered>
//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Student</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {editStudent && (
//               <Form>
//                 <Form.Group className="mb-2">
//                   <Form.Label>Name</Form.Label>
//                   <Form.Control
//                     value={editStudent.name}
//                     onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
//                   />
//                 </Form.Group>
//                 {subjects.map(sub => (
//                   <Form.Group key={sub} className="mb-2">
//                     <Form.Label>{sub} Score</Form.Label>
//                     <Form.Control
//                       type="number"
//                       min="0"
//                       max="100"
//                       value={editStudent.scores[sub]}
//                       onChange={(e) =>
//                         setEditStudent({
//                           ...editStudent,
//                           scores: {
//                             ...editStudent.scores,
//                             [sub]: parseInt(e.target.value) || 0
//                           }
//                         })
//                       }
//                     />
//                   </Form.Group>
//                 ))}
//               </Form>
//             )}
//           </Modal.Body>
//           <Modal.Footer>
//             <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
//             <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
//           </Modal.Footer>
//         </motion.div>
//       </Modal>
//     </div>
//   );
// };

// export default Progress;


import React, { useEffect, useState } from 'react';
import {
  Card, Table, Badge, Row, Col, Form, InputGroup, Button, Modal, Alert
} from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
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

const Progress = () => {
  const [classData, setClassData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [editClassIndex, setEditClassIndex] = useState(null);
  const [error, setError] = useState('');
  const [visibleCards, setVisibleCards] = useState({});

  const fetchProgressData = async () => {
    try {
      const res = await axios.get('/api/class-progress');
      setClassData(res.data);
      localStorage.setItem('progressClassData', JSON.stringify(res.data));
      setError('');
    } catch {
      const stored = localStorage.getItem('progressClassData');
      if (stored) {
        setClassData(JSON.parse(stored));
        setError('⚠️ Backend unreachable. Loaded from localStorage.');
      } else {
        setError('❌ No data available.');
      }
    }
  };

  useEffect(() => {
    fetchProgressData();
    const interval = setInterval(fetchProgressData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeouts = {};
    classData.forEach((_, idx) => {
      timeouts[idx] = setTimeout(() => {
        setVisibleCards(prev => ({ ...prev, [idx]: true }));
      }, idx * 200);
    });
    return () => Object.values(timeouts).forEach(clearTimeout);
  }, [classData]);

  const calcSubjectAvg = (students) => {
    const avg = {};
    subjects.forEach(sub => {
      avg[sub] = Math.round(students.reduce((sum, s) => sum + s.scores[sub], 0) / students.length);
    });
    return avg;
  };

  const handleEdit = (student, classIndex) => {
    setEditStudent({ ...student });
    setEditClassIndex(classIndex);
    setEditModal(true);
  };

  const handleDelete = async (studentId, classIndex) => {
    const updatedClassData = [...classData];
    const classId = updatedClassData[classIndex].className;

    updatedClassData[classIndex].students = updatedClassData[classIndex].students.filter(s => s.id !== studentId);
    updatedClassData[classIndex].subjectAverages = calcSubjectAvg(updatedClassData[classIndex].students);

    setClassData(updatedClassData);
    localStorage.setItem('progressClassData', JSON.stringify(updatedClassData));

    try {
      await axios.delete(`/api/class-progress/${classId}/student/${studentId}`);
    } catch {
      console.warn('Delete failed on backend. Saved locally.');
    }
  };

  const handleSaveEdit = async () => {
    const updatedClassData = [...classData];
    const classId = updatedClassData[editClassIndex].className;

    const updatedStudents = updatedClassData[editClassIndex].students.map(s =>
      s.id === editStudent.id ? {
        ...editStudent,
        average: Math.round(Object.values(editStudent.scores).reduce((a, b) => a + b) / subjects.length),
        topSubject: Object.entries(editStudent.scores).sort((a, b) => b[1] - a[1])[0][0]
      } : s
    );

    updatedClassData[editClassIndex].students = updatedStudents;
    updatedClassData[editClassIndex].subjectAverages = calcSubjectAvg(updatedStudents);

    setClassData(updatedClassData);
    localStorage.setItem('progressClassData', JSON.stringify(updatedClassData));
    setEditModal(false);

    try {
      await axios.put(`/api/class-progress/${classId}/student/${editStudent.id}`, editStudent);
    } catch {
      console.warn('Edit failed on backend. Saved locally.');
    }
  };

  const filteredClassData = classData
    .map(classItem => {
      const filteredStudents = classItem.students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const classMatches = classItem.className.toLowerCase().includes(searchTerm.toLowerCase());

      return {
        ...classItem,
        students: classMatches ? classItem.students : filteredStudents
      };
    })
    .filter(classItem => classItem.students.length > 0 || searchTerm === '');

  return (
    <div className="p-3">
      {error && <Alert variant="warning" className="text-center">{error}</Alert>}

      <InputGroup className="mb-4 w-50 mx-auto">
        <InputGroup.Text><FaSearch /></InputGroup.Text>
        <Form.Control
          placeholder="Search by student name, ID or class name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      {filteredClassData.map(({ className, students, subjectAverages }, idx) => (
        <div
          key={idx}
          style={{
            ...fadeInStyle,
            ...(visibleCards[idx] ? { opacity: 1, transform: 'translateY(0)' } : {})
          }}
        >
          <Card className="mb-5 shadow">
            <Card.Body>
              <h3 className="text-center mb-4">{className} - Student Progress</h3>

              <Row className="mb-4">
                <Col>
                  <div style={{ height: '300px' }}>
                    <Bar
                      data={{
                        labels: subjects,
                        datasets: [{
                          label: 'Average Score',
                          data: subjects.map(sub => subjectAverages[sub]),
                          backgroundColor: ['#007bff', '#ffc107', '#28a745', '#dc3545']
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: { y: { beginAtZero: true, max: 100 } }
                      }}
                    />
                  </div>
                </Col>
              </Row>

              <Table hover responsive bordered style={{
                ...fadeInStyle,
                ...(visibleCards[idx] ? { opacity: 1, transform: 'translateY(0)' } : {})
              }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    {subjects.map(sub => <th key={sub}>{sub}</th>)}
                    <th>Average</th>
                    <th>Top Subject</th>
                    <th>Improvement</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id}</td>
                      <td>{student.name}</td>
                      {subjects.map(sub => <td key={sub}>{student.scores[sub]}%</td>)}
                      <td><strong>{student.average}%</strong></td>
                      <td>{student.topSubject}</td>
                      <td>
                        <Badge bg={student.improvement > 10 ? 'success' : 'warning'}>
                          {student.improvement}%
                        </Badge>
                      </td>
                      <td>
                        <Button size="sm" variant="info" onClick={() => handleEdit(student, idx)} className="me-2">
                          <FaEdit />
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleDelete(student.id, idx)}>
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

      {/* ✏️ Edit Modal with inline fade-in */}
      <Modal show={editModal} onHide={() => setEditModal(false)} centered>
        <div style={{
          ...fadeInStyle,
          opacity: 1,
          transform: 'scale(1)',
          transition: 'all 0.3s ease'
        }}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {editStudent && (
              <Form>
                <Form.Group className="mb-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    value={editStudent.name}
                    onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })}
                  />
                </Form.Group>
                {subjects.map(sub => (
                  <Form.Group key={sub} className="mb-2">
                    <Form.Label>{sub} Score</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      max="100"
                      value={editStudent.scores[sub]}
                      onChange={(e) =>
                        setEditStudent({
                          ...editStudent,
                          scores: {
                            ...editStudent.scores,
                            [sub]: parseInt(e.target.value) || 0
                          }
                        })
                      }
                    />
                  </Form.Group>
                ))}
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setEditModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default Progress;
