// // // import React, { useState,useEffect } from 'react';
// // // import {
// // //   Form, Button, Card, Container, InputGroup, Modal, Alert, Toast, ToastContainer,
// // // } from 'react-bootstrap';
// // // import {
// // //   FaUser, FaLock, FaSignInAlt, FaEnvelope, FaKey
// // // } from 'react-icons/fa';
// // // import { useNavigate } from 'react-router-dom';
// // // import '../App.css';

// // // const LoginPage = () => {
// // //   const [email, setEmail] = useState('admin@example.com');
// // //   const [password, setPassword] = useState('admin');
// // //   const [showResetModal, setShowResetModal] = useState(false);
// // //   const [resetEmail, setResetEmail] = useState('');
// // //   const [showOTPField, setShowOTPField] = useState(false);
// // //   const [otp, setOtp] = useState('');
// // //   const [generatedOtp, setGeneratedOtp] = useState('');
// // //   const [showPasswordResetFields, setShowPasswordResetFields] = useState(false);
// // //   const [newPassword, setNewPassword] = useState('');
// // //   const [confirmPassword, setConfirmPassword] = useState('');
// // //   const [resetSuccess, setResetSuccess] = useState('');
// // //   const [error, setError] = useState('');
// // //   const [showToast, setShowToast] = useState(false);
// // //   const navigate = useNavigate();
// // // useEffect(() => {
// // //     document.title = "login page  | prime mind - Your Smart Learning Platform";
// // //   }, []);
// // //   const handleLogin = (e) => {
// // //     e.preventDefault();
// // //     if (email === 'admin@example.com' && password === 'admin') {
// // //       localStorage.setItem('isAuthenticated', true);
// // //       navigate('/dashboard');
// // //     } else {
// // //       alert('Invalid credentials');
// // //     }
// // //   };

// // //   const sendOTP = () => {
// // //     if (resetEmail === 'admin@example.com') {
// // //       const generated = Math.floor(100000 + Math.random() * 900000).toString();
// // //       setGeneratedOtp(generated);
// // //       alert(`🔐 OTP sent to ${resetEmail}: ${generated}`);
// // //       setShowOTPField(true);
// // //       setError('');
// // //     } else {
// // //       setError('Email not registered.');
// // //     }
// // //   };

// // //   const verifyOTP = () => {
// // //     if (otp === generatedOtp) {
// // //       setShowPasswordResetFields(true);
// // //       setError('');
// // //     } else {
// // //       setError('Invalid OTP. Please try again.');
// // //     }
// // //   };

// // //   const resetPassword = () => {
// // //     if (newPassword !== confirmPassword) {
// // //       setError('Passwords do not match.');
// // //     } else if (newPassword.length < 5) {
// // //       setError('Password should be at least 5 characters.');
// // //     } else {
// // //       setResetSuccess('✅ Password has been reset successfully!');
// // //       setError('');
// // //       setShowResetModal(false);
// // //       setPassword(newPassword);
// // //       setShowToast(true);
// // //     }
// // //   };

// // //   return (
// // //     <div className="login-bg d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
// // //       <Container className="px-3">
// // //         <Card className="login-card animated-card shadow mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
// // //           {/* 🔄 Logo Instead of Lock Icon */}
// // //           <div className="text-center mb-4 mt-3">
// // //             <img
// // //               src="/NOVYA LOGO.png"
// // //               alt="NOVYA Logo"
// // //               style={{ width: '80px', height: '80px', borderRadius: '30px' }}
// // //             />
// // //            <h4 className="mt-2 gradient-text">Admin Login</h4>

// // //           </div>

// // //           <Card.Body>
// // //             <Form onSubmit={handleLogin}>
// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>Email</Form.Label>
// // //                 <InputGroup>
// // //                   <InputGroup.Text><FaUser /></InputGroup.Text>
// // //                   <Form.Control
// // //                     type="email"
// // //                     placeholder="Enter email"
// // //                     value={email}
// // //                     onChange={(e) => setEmail(e.target.value)}
// // //                     required
// // //                   />
// // //                 </InputGroup>
// // //               </Form.Group>

// // //               <Form.Group className="mb-3">
// // //                 <Form.Label>Password</Form.Label>
// // //                 <InputGroup>
// // //                   <InputGroup.Text><FaLock /></InputGroup.Text>
// // //                   <Form.Control
// // //                     type="password"
// // //                     placeholder="Enter password"
// // //                     value={password}
// // //                     onChange={(e) => setPassword(e.target.value)}
// // //                     required
// // //                   />
// // //                 </InputGroup>
// // //               </Form.Group>

// // //               <div className="d-flex justify-content-end mb-3">
// // //                 <Button variant="link" size="sm" onClick={() => setShowResetModal(true)}>
// // //                   Forgot Password?
// // //                 </Button>
// // //               </div>

// // //               <Button type="submit" variant="primary" className="w-100">
// // //                 Login <FaSignInAlt className="ms-2" />
// // //               </Button>
// // //             </Form>
// // //           </Card.Body>
// // //         </Card>
// // //       </Container>

// // //       {/* ✅ Toast Notification */}
// // //       <ToastContainer position="top-center" className="p-3">
// // //         <Toast bg="success" show={showToast} delay={3000} onClose={() => setShowToast(false)} autohide>
// // //           <Toast.Header closeButton>
// // //             <strong className="me-auto">Success</strong>
// // //           </Toast.Header>
// // //           <Toast.Body className="text-white">Password Reset Successful</Toast.Body>
// // //         </Toast>
// // //       </ToastContainer>

// // //       {/* 🔐 Reset Modal */}
// // //       <Modal show={showResetModal} onHide={() => setShowResetModal(false)} centered>
// // //         <Modal.Header closeButton>
// // //           <Modal.Title>Reset Password</Modal.Title>
// // //         </Modal.Header>
// // //         <Modal.Body className="animated-modal">
// // //           {resetSuccess && <Alert variant="success">{resetSuccess}</Alert>}
// // //           {error && <Alert variant="danger">{error}</Alert>}

// // //           {!showOTPField && !showPasswordResetFields && (
// // //             <>
// // //               <Form.Group>
// // //                 <Form.Label>Email Address</Form.Label>
// // //                 <InputGroup>
// // //                   <InputGroup.Text><FaEnvelope /></InputGroup.Text>
// // //                   <Form.Control
// // //                     type="email"
// // //                     placeholder="Enter your email"
// // //                     value={resetEmail}
// // //                     onChange={(e) => setResetEmail(e.target.value)}
// // //                   />
// // //                 </InputGroup>
// // //               </Form.Group>
// // //               <Button className="mt-3 w-100" variant="primary" onClick={sendOTP}>
// // //                 Send OTP
// // //               </Button>
// // //             </>
// // //           )}

// // //           {showOTPField && !showPasswordResetFields && (
// // //             <>
// // //               <Form.Group className="mt-3">
// // //                 <Form.Label>Enter OTP</Form.Label>
// // //                 <Form.Control
// // //                   type="text"
// // //                   placeholder="6-digit OTP"
// // //                   value={otp}
// // //                   onChange={(e) => setOtp(e.target.value)}
// // //                 />
// // //               </Form.Group>
// // //               <Button className="mt-3 w-100" variant="primary" onClick={verifyOTP}>
// // //                 Verify OTP
// // //               </Button>
// // //             </>
// // //           )}

// // //           {showPasswordResetFields && (
// // //             <>
// // //               <Form.Group className="mt-3">
// // //                 <Form.Label>New Password</Form.Label>
// // //                 <InputGroup>
// // //                   <InputGroup.Text><FaKey /></InputGroup.Text>
// // //                   <Form.Control
// // //                     type="password"
// // //                     placeholder="New password"
// // //                     value={newPassword}
// // //                     onChange={(e) => setNewPassword(e.target.value)}
// // //                   />
// // //                 </InputGroup>
// // //               </Form.Group>

// // //               <Form.Group className="mt-3">
// // //                 <Form.Label>Confirm Password</Form.Label>
// // //                 <InputGroup>
// // //                   <InputGroup.Text><FaKey /></InputGroup.Text>
// // //                   <Form.Control
// // //                     type="password"
// // //                     placeholder="Confirm password"
// // //                     value={confirmPassword}
// // //                     onChange={(e) => setConfirmPassword(e.target.value)}
// // //                   />
// // //                 </InputGroup>
// // //               </Form.Group>

// // //               <Button className="mt-3 w-100" variant="success" onClick={resetPassword}>
// // //                 Reset Password
// // //               </Button>
// // //             </>
// // //           )}
// // //         </Modal.Body>
// // //         <Modal.Footer>
// // //           <Button variant="secondary" onClick={() => setShowResetModal(false)}>Close</Button>
// // //         </Modal.Footer>
// // //       </Modal>
// // //     </div>
// // //   );
// // // };

// // // export default LoginPage;
// // import React, { useState, useEffect } from 'react';
// // import {
// //   Form, Button, Card, Container, InputGroup, Modal, Alert, Toast, ToastContainer,
// // } from 'react-bootstrap';
// // import {
// //   FaUser, FaLock, FaSignInAlt, FaEnvelope, FaKey
// // } from 'react-icons/fa';
// // import { useNavigate } from 'react-router-dom';
// // import '../App.css';

// // const LoginPage = () => {
// //   const [email, setEmail] = useState('admin@example.com');
// //   const [password, setPassword] = useState('admin');
// //   const [showResetModal, setShowResetModal] = useState(false);
// //   const [resetEmail, setResetEmail] = useState('');
// //   const [showOTPField, setShowOTPField] = useState(false);
// //   const [otp, setOtp] = useState('');
// //   const [generatedOtp, setGeneratedOtp] = useState('');
// //   const [showPasswordResetFields, setShowPasswordResetFields] = useState(false);
// //   const [newPassword, setNewPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [resetSuccess, setResetSuccess] = useState('');
// //   const [error, setError] = useState('');
// //   const [showToast, setShowToast] = useState(false);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     document.title = "Login | Prime Mind - Your Smart Learning Platform";
// //   }, []);

// //   const handleLogin = (e) => {
// //     e.preventDefault();
// //     if (email === 'admin@example.com' && password === 'admin') {
// //       localStorage.setItem('isAuthenticated', true);
// //       navigate('/dashboard');
// //     } else {
// //       alert('Invalid credentials');
// //     }
// //   };

// //   const sendOTP = () => {
// //     if (resetEmail === 'admin@example.com') {
// //       const generated = Math.floor(100000 + Math.random() * 900000).toString();
// //       setGeneratedOtp(generated);
// //       alert(`🔐 OTP sent to ${resetEmail}: ${generated}`);
// //       setShowOTPField(true);
// //       setError('');
// //     } else {
// //       setError('❌ Email not registered.');
// //     }
// //   };

// //   const verifyOTP = () => {
// //     if (otp === generatedOtp) {
// //       setShowPasswordResetFields(true);
// //       setError('');
// //     } else {
// //       setError('❌ Invalid OTP. Please try again.');
// //     }
// //   };

// //   const resetPassword = () => {
// //     if (newPassword !== confirmPassword) {
// //       setError('❌ Passwords do not match.');
// //     } else if (newPassword.length < 5) {
// //       setError('❌ Password should be at least 5 characters.');
// //     } else {
// //       setResetSuccess('✅ Password has been reset successfully!');
// //       setError('');
// //       setPassword(newPassword);
// //       setShowToast(true);
// //       handleModalClose();
// //     }
// //   };

// //   const handleModalClose = () => {
// //     setShowResetModal(false);
// //     setResetEmail('');
// //     setOtp('');
// //     setGeneratedOtp('');
// //     setShowOTPField(false);
// //     setShowPasswordResetFields(false);
// //     setNewPassword('');
// //     setConfirmPassword('');
// //     setResetSuccess('');
// //     setError('');
// //   };

// //   return (
// //     <div className="login-bg d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
// //       <Container className="px-3">
// //         <Card className="login-card animated-card shadow mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
// //           <div className="text-center mb-4 mt-3">
// //             <img
// //               src="/NOVYA LOGO.png"
// //               alt="NOVYA Logo"
// //               style={{ width: '80px', height: '80px', borderRadius: '30px' }}
// //             />
// //             <h4 className="mt-2 gradient-text">Admin Login</h4>
// //           </div>

// //           <Card.Body>
// //             <Form onSubmit={handleLogin}>
// //               <Form.Group className="mb-3">
// //                 <Form.Label>Email</Form.Label>
// //                 <InputGroup>
// //                   <InputGroup.Text><FaUser /></InputGroup.Text>
// //                   <Form.Control
// //                     type="email"
// //                     placeholder="Enter email"
// //                     value={email}
// //                     onChange={(e) => setEmail(e.target.value)}
// //                     required
// //                   />
// //                 </InputGroup>
// //               </Form.Group>

// //               <Form.Group className="mb-3">
// //                 <Form.Label>Password</Form.Label>
// //                 <InputGroup>
// //                   <InputGroup.Text><FaLock /></InputGroup.Text>
// //                   <Form.Control
// //                     type="password"
// //                     placeholder="Enter password"
// //                     value={password}
// //                     onChange={(e) => setPassword(e.target.value)}
// //                     required
// //                   />
// //                 </InputGroup>
// //               </Form.Group>

// //               <div className="d-flex justify-content-end mb-3">
// //                 <Button variant="link" size="sm" onClick={() => setShowResetModal(true)}>
// //                   Forgot Password?
// //                 </Button>
// //               </div>

// //               <Button type="submit" variant="primary" className="w-100">
// //                 Login <FaSignInAlt className="ms-2" />
// //               </Button>
// //             </Form>
// //           </Card.Body>
// //         </Card>
// //       </Container>

// //       {/* ✅ Toast Notification */}
// //       <ToastContainer position="top-center" className="p-3">
// //         <Toast bg="success" show={showToast} delay={3000} onClose={() => setShowToast(false)} autohide>
// //           <Toast.Header closeButton>
// //             <strong className="me-auto">Success</strong>
// //           </Toast.Header>
// //           <Toast.Body className="text-white">Password Reset Successful</Toast.Body>
// //         </Toast>
// //       </ToastContainer>

// //       {/* 🔐 Reset Modal */}
// //       <Modal show={showResetModal} onHide={handleModalClose} centered>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Reset Password</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body className="animated-modal">
// //           {resetSuccess && <Alert variant="success">{resetSuccess}</Alert>}
// //           {error && <Alert variant="danger">{error}</Alert>}

// //           {!showOTPField && !showPasswordResetFields && (
// //             <>
// //               <Form.Group>
// //                 <Form.Label>Email Address</Form.Label>
// //                 <InputGroup>
// //                   <InputGroup.Text><FaEnvelope /></InputGroup.Text>
// //                   <Form.Control
// //                     type="email"
// //                     placeholder="Enter your email"
// //                     value={resetEmail}
// //                     onChange={(e) => setResetEmail(e.target.value)}
// //                   />
// //                 </InputGroup>
// //               </Form.Group>
// //               <Button className="mt-3 w-100" variant="primary" onClick={sendOTP}>
// //                 Send OTP
// //               </Button>
// //             </>
// //           )}

// //           {showOTPField && !showPasswordResetFields && (
// //             <>
// //               <Form.Group className="mt-3">
// //                 <Form.Label>Enter OTP</Form.Label>
// //                 <Form.Control
// //                   type="text"
// //                   placeholder="6-digit OTP"
// //                   value={otp}
// //                   onChange={(e) => setOtp(e.target.value)}
// //                 />
// //               </Form.Group>
// //               <Button className="mt-3 w-100" variant="primary" onClick={verifyOTP}>
// //                 Verify OTP
// //               </Button>
// //             </>
// //           )}

// //           {showPasswordResetFields && (
// //             <>
// //               <Form.Group className="mt-3">
// //                 <Form.Label>New Password</Form.Label>
// //                 <InputGroup>
// //                   <InputGroup.Text><FaKey /></InputGroup.Text>
// //                   <Form.Control
// //                     type="password"
// //                     placeholder="New password"
// //                     value={newPassword}
// //                     onChange={(e) => setNewPassword(e.target.value)}
// //                   />
// //                 </InputGroup>
// //               </Form.Group>

// //               <Form.Group className="mt-3">
// //                 <Form.Label>Confirm Password</Form.Label>
// //                 <InputGroup>
// //                   <InputGroup.Text><FaKey /></InputGroup.Text>
// //                   <Form.Control
// //                     type="password"
// //                     placeholder="Confirm password"
// //                     value={confirmPassword}
// //                     onChange={(e) => setConfirmPassword(e.target.value)}
// //                   />
// //                 </InputGroup>
// //               </Form.Group>

// //               <Button className="mt-3 w-100" variant="success" onClick={resetPassword}>
// //                 Reset Password
// //               </Button>
// //             </>
// //           )}
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={handleModalClose}>Close</Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default LoginPage;


// import React, { useState, useEffect } from 'react';
// import {
//   Form, Button, Card, Container, InputGroup, Modal, Alert, Toast, ToastContainer,
// } from 'react-bootstrap';
// import {
//   FaUser, FaLock, FaSignInAlt, FaEnvelope, FaKey
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import '../App.css'; // Keep this for your CSS

// const LoginPage = () => {
//   const [email, setEmail] = useState('admin@example.com');
//   const [password, setPassword] = useState('admin');
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');
//   const [showOTPField, setShowOTPField] = useState(false);
//   const [otp, setOtp] = useState('');
//   const [generatedOtp, setGeneratedOtp] = useState('');
//   const [showPasswordResetFields, setShowPasswordResetFields] = useState(false);
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [resetSuccess, setResetSuccess] = useState('');
//   const [error, setError] = useState('');
//   const [showToast, setShowToast] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     document.title = "Login | Prime Mind - Your Smart Learning Platform";
//   }, []);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (email === 'admin@example.com' && password === 'admin') {
//       localStorage.setItem('isAuthenticated', true);
//       navigate('/dashboard');
//     } else {
//       alert('Invalid credentials');
//     }
//   };

//   const sendOTP = () => {
//     if (resetEmail === 'admin@example.com') {
//       const generated = Math.floor(100000 + Math.random() * 900000).toString();
//       setGeneratedOtp(generated);
//       alert(`🔐 OTP sent to ${resetEmail}: ${generated}`);
//       setShowOTPField(true);
//       setError('');
//     } else {
//       setError('❌ Email not registered.');
//     }
//   };

//   const verifyOTP = () => {
//     if (otp === generatedOtp) {
//       setShowPasswordResetFields(true);
//       setError('');
//     } else {
//       setError('❌ Invalid OTP. Please try again.');
//     }
//   };

//   const resetPassword = () => {
//     if (newPassword !== confirmPassword) {
//       setError('❌ Passwords do not match.');
//     } else if (newPassword.length < 5) {
//       setError('❌ Password should be at least 5 characters.');
//     } else {
//       setResetSuccess('✅ Password has been reset successfully!');
//       setError('');
//       setPassword(newPassword);
//       setShowToast(true);
//       handleModalClose();
//     }
//   };

//   const handleModalClose = () => {
//     setShowResetModal(false);
//     setResetEmail('');
//     setOtp('');
//     setGeneratedOtp('');
//     setShowOTPField(false);
//     setShowPasswordResetFields(false);
//     setNewPassword('');
//     setConfirmPassword('');
//     setResetSuccess('');
//     setError('');
//   };

//   return (
//     <div className="login-bg d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
//       <Container className="px-3">
//         <Card className="login-card animated-card shadow mx-auto" style={{ maxWidth: '400px', width: '100%' }}>
//           <div className="text-center mb-4 mt-3">
//             <img
//               src="/NOVYA LOGO (1).png"
//               alt="NOVYA Logo"
//               style={{ width: '80px', height: '80px', borderRadius: '30px' }}
//             />
//             <h4 className="mt-2" style={{
//               background: 'linear-gradient(90deg, #6D0DAD, #C316A4, #F02D6D, #FF5E52, #FF8547)',
//               WebkitBackgroundClip: 'text',
//               WebkitTextFillColor: 'transparent',
//               fontWeight: 'bold'
//             }}>
//               Admin Login
//             </h4>
//           </div>

//           <Card.Body>
//             <Form onSubmit={handleLogin}>
//               <Form.Group className="mb-3">
//                 <Form.Label>Email</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text><FaUser /></InputGroup.Text>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </InputGroup>
//               </Form.Group>

//               <Form.Group className="mb-3">
//                 <Form.Label>Password</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text><FaLock /></InputGroup.Text>
//                   <Form.Control
//                     type="password"
//                     placeholder="Enter password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </InputGroup>
//               </Form.Group>

//               <div className="d-flex justify-content-end mb-3">
//                 <Button variant="link" size="sm" onClick={() => setShowResetModal(true)}>
//                   Forgot Password?
//                 </Button>
//               </div>

//               <Button type="submit" variant="primary" className="w-100">
//                 Login <FaSignInAlt className="ms-2" />
//               </Button>
//             </Form>
//           </Card.Body>
//         </Card>
//       </Container>

//       {/* ✅ Toast Notification */}
//       <ToastContainer position="top-center" className="p-3">
//         <Toast bg="success" show={showToast} delay={3000} onClose={() => setShowToast(false)} autohide>
//           <Toast.Header closeButton>
//             <strong className="me-auto">Success</strong>
//           </Toast.Header>
//           <Toast.Body className="text-white">Password Reset Successful</Toast.Body>
//         </Toast>
//       </ToastContainer>

//       {/* 🔐 Reset Modal */}
//       <Modal show={showResetModal} onHide={handleModalClose} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Reset Password</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="animated-modal">
//           {resetSuccess && <Alert variant="success">{resetSuccess}</Alert>}
//           {error && <Alert variant="danger">{error}</Alert>}

//           {!showOTPField && !showPasswordResetFields && (
//             <>
//               <Form.Group>
//                 <Form.Label>Email Address</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text><FaEnvelope /></InputGroup.Text>
//                   <Form.Control
//                     type="email"
//                     placeholder="Enter your email"
//                     value={resetEmail}
//                     onChange={(e) => setResetEmail(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>
//               <Button className="mt-3 w-100" variant="primary" onClick={sendOTP}>
//                 Send OTP
//               </Button>
//             </>
//           )}

//           {showOTPField && !showPasswordResetFields && (
//             <>
//               <Form.Group className="mt-3">
//                 <Form.Label>Enter OTP</Form.Label>
//                 <Form.Control
//                   type="text"
//                   placeholder="6-digit OTP"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                 />
//               </Form.Group>
//               <Button className="mt-3 w-100" variant="primary" onClick={verifyOTP}>
//                 Verify OTP
//               </Button>
//             </>
//           )}

//           {showPasswordResetFields && (
//             <>
//               <Form.Group className="mt-3">
//                 <Form.Label>New Password</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text><FaKey /></InputGroup.Text>
//                   <Form.Control
//                     type="password"
//                     placeholder="New password"
//                     value={newPassword}
//                     onChange={(e) => setNewPassword(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               <Form.Group className="mt-3">
//                 <Form.Label>Confirm Password</Form.Label>
//                 <InputGroup>
//                   <InputGroup.Text><FaKey /></InputGroup.Text>
//                   <Form.Control
//                     type="password"
//                     placeholder="Confirm password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                   />
//                 </InputGroup>
//               </Form.Group>

//               <Button className="mt-3 w-100" variant="success" onClick={resetPassword}>
//                 Reset Password
//               </Button>
//             </>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default LoginPage;


import React, { useState, useEffect } from 'react';
import {
  Form, Button, Card, Container, InputGroup, Modal, Alert, Toast, ToastContainer,
} from 'react-bootstrap';
import {
  FaUser, FaLock, FaSignInAlt, FaEnvelope, FaKey
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Keep this for your CSS

const LoginPage = () => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('admin');
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showOTPField, setShowOTPField] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [showPasswordResetFields, setShowPasswordResetFields] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Prime Mind - Your Smart Learning Platform";
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'admin') {
      localStorage.setItem('isAuthenticated', true);
      navigate('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  const sendOTP = () => {
    if (resetEmail === 'admin@example.com') {
      const generated = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(generated);
      alert(`🔐 OTP sent to ${resetEmail}: ${generated}`);
      setShowOTPField(true);
      setError('');
    } else {
      setError('❌ Email not registered.');
    }
  };

  const verifyOTP = () => {
    if (otp === generatedOtp) {
      setShowPasswordResetFields(true);
      setError('');
    } else {
      setError('❌ Invalid OTP. Please try again.');
    }
  };

  const resetPassword = () => {
    if (newPassword !== confirmPassword) {
      setError('❌ Passwords do not match.');
    } else if (newPassword.length < 5) {
      setError('❌ Password should be at least 5 characters.');
    } else {
      setResetSuccess('✅ Password has been reset successfully!');
      setError('');
      setPassword(newPassword);
      setShowToast(true);
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setShowResetModal(false);
    setResetEmail('');
    setOtp('');
    setGeneratedOtp('');
    setShowOTPField(false);
    setShowPasswordResetFields(false);
    setNewPassword('');
    setConfirmPassword('');
    setResetSuccess('');
    setError('');
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center"
      style={{
        minHeight: '100vh',
        backgroundColor: '#e3f2fd' // Light Blue Background
      }}
    >
      <Container className="px-3">
        <Card className="login-card animated-card shadow mx-auto"
          style={{
            maxWidth: '400px',
            width: '100%',
            borderRadius: '1rem'
          }}
        >
          <div className="text-center mb-4 mt-3">
            <img
              src="/NOVYA LOGO (1).png"
              alt="NOVYA Logo"
              style={{ width: '80px', height: '80px', borderRadius: '30px' }}
            />
            <h4 className="mt-2" style={{
              background: 'linear-gradient(90deg, #6D0DAD, #C316A4, #F02D6D, #FF5E52, #FF8547)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              Admin Login
            </h4>
          </div>

          <Card.Body>
            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaUser /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaLock /></InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-end mb-3">
                <Button variant="link" size="sm" onClick={() => setShowResetModal(true)}>
                  Forgot Password?
                </Button>
              </div>

              <Button type="submit" variant="primary" className="w-100">
                Login <FaSignInAlt className="ms-2" />
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>

      <ToastContainer position="top-center" className="p-3">
        <Toast bg="success" show={showToast} delay={3000} onClose={() => setShowToast(false)} autohide>
          <Toast.Header closeButton>
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body className="text-white">Password Reset Successful</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showResetModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Reset Password</Modal.Title>
        </Modal.Header>
        <Modal.Body className="animated-modal">
          {resetSuccess && <Alert variant="success">{resetSuccess}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          {!showOTPField && !showPasswordResetFields && (
            <>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaEnvelope /></InputGroup.Text>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Button className="mt-3 w-100" variant="primary" onClick={sendOTP}>
                Send OTP
              </Button>
            </>
          )}

          {showOTPField && !showPasswordResetFields && (
            <>
              <Form.Group className="mt-3">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              <Button className="mt-3 w-100" variant="primary" onClick={verifyOTP}>
                Verify OTP
              </Button>
            </>
          )}

          {showPasswordResetFields && (
            <>
              <Form.Group className="mt-3">
                <Form.Label>New Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaKey /></InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <InputGroup.Text><FaKey /></InputGroup.Text>
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>

              <Button className="mt-3 w-100" variant="success" onClick={resetPassword}>
                Reset Password
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
