// // import React, { useState, useEffect } from 'react';
// // import {
// //   Navbar,
// //   Container,
// //   Button,
// //   Dropdown,
// //   Badge,
// //   Modal,
// //   Form,
// //   Offcanvas,
// //   Spinner
// // } from 'react-bootstrap';
// // import {
// //   FaBell,
// //   FaEnvelope,
// //   FaUser,
// //   FaUserCog,
// //   FaBars,
// //   FaTimes
// // } from 'react-icons/fa';
// // import axios from 'axios';
// // import '../App.css';

// // const TopBar = ({ darkMode, setDarkMode, showSidebar, toggleSidebar }) => {
// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [showProfile, setShowProfile] = useState(false);
// //   const [profile, setProfile] = useState({ name: '', email: '' });
// //   const [notifications, setNotifications] = useState([]);
// //   const [loadingProfile, setLoadingProfile] = useState(true);
// //   const [loadingNotifications, setLoadingNotifications] = useState(true);

// //   // ✅ Fetch profile
// //   const fetchProfile = async () => {
// //     try {
// //       const res = await axios.get('https://your-backend-api.com/api/profile');
// //       setProfile(res.data);
// //     } catch (err) {
// //       console.error('Failed to fetch profile:', err);
// //     } finally {
// //       setLoadingProfile(false);
// //     }
// //   };

// //   // ✅ Fetch notifications
// //   const fetchNotifications = async () => {
// //     try {
// //       const res = await axios.get('https://your-backend-api.com/api/notifications');
// //       setNotifications(res.data);
// //     } catch (err) {
// //       console.error('Failed to fetch notifications:', err);
// //     } finally {
// //       setLoadingNotifications(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProfile();
// //     fetchNotifications();
// //     const interval = setInterval(() => {
// //       fetchNotifications();
// //     }, 10000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const handleMailClick = () => {
// //     window.open('https://mail.google.com', '_blank');
// //   };

// //   const handleProfileSave = async () => {
// //     try {
// //       await axios.put('https://your-backend-api.com/api/profile', profile);
// //       setShowProfile(false);
// //       alert('Profile updated!');
// //     } catch (err) {
// //       console.error('Error saving profile:', err);
// //       alert('Failed to save profile');
// //     }
// //   };

// //   return (
// //     <>
// //       <Navbar
// //         bg={darkMode ? 'dark' : 'light'}
// //         variant={darkMode ? 'dark' : 'light'}
// //         className="top-nav fixed-top px-2"
// //         expand="lg"
// //         style={{ zIndex: 1030 }}
// //       >
// //         <Container fluid className="d-flex justify-content-between align-items-center">
// //           {/* Left: Logo and Title */}
// //           <div className="d-flex align-items-center">
// //             <Button
// //               variant="link"
// //               className="me-2 sidebar-toggle p-0"
// //               onClick={toggleSidebar}
// //               aria-label="Toggle sidebar"
// //             >
// //               {showSidebar ? <FaTimes className="fs-4" /> : <FaBars className="fs-4" />}
// //             </Button>
// //             <Navbar.Brand className="fw-bold d-flex align-items-center">
// //               <img
// //                 src="/NOVYA%20LOGO.png"
// //                 alt="NOVYA Logo"
// //                 style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '5px' }}
// //               />
// //               <span className="app-name-text d-none d-sm-inline">NOVYA</span>
// //             </Navbar.Brand>
// //           </div>

// //           {/* Right: Actions */}
// //           <div className="d-flex align-items-center gap-3">
// //             {/* 🔔 Notifications */}
// //             <Button
// //               variant="link"
// //               className="position-relative p-0"
// //               onClick={() => setShowNotifications(true)}
// //               aria-label="Notifications"
// //             >
// //               <FaBell className="fs-5" />
// //               {notifications.length > 0 && (
// //                 <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
// //                   {notifications.length}
// //                 </Badge>
// //               )}
// //             </Button>

// //             {/* 📧 Mail */}
// //             <Button
// //               variant="link"
// //               className="position-relative p-0"
// //               onClick={handleMailClick}
// //               aria-label="Mail"
// //             >
// //               <FaEnvelope className="fs-5" />
// //               <Badge pill bg="primary" className="position-absolute top-0 start-100 translate-middle">
// //                 5
// //               </Badge>
// //             </Button>

// //             {/* 🧑 Profile Info */}
// //             <div className="user-info d-none d-md-flex flex-column text-end">
// //               {loadingProfile ? (
// //                 <small className="text-muted">Loading...</small>
// //               ) : (
// //                 <>
// //                   <div className="fw-bold">{profile.name}</div>
// //                   <small className="text-muted">{profile.email}</small>
// //                 </>
// //               )}
// //             </div>

// //             {/* Profile Dropdown */}
// //             <Dropdown align="end">
// //               <Dropdown.Toggle variant="link" className="profile-toggle p-0">
// //                 <div className="d-flex align-items-center">
// //                   <div className="avatar">
// //                     <FaUser className="fs-5" />
// //                   </div>
// //                 </div>
// //               </Dropdown.Toggle>

// //               <Dropdown.Menu>
// //                 <Dropdown.Header>Account</Dropdown.Header>
// //                 <Dropdown.Item onClick={() => setShowProfile(true)}>
// //                   <FaUser className="me-2" /> View/Edit Profile
// //                 </Dropdown.Item>
// //                 <Dropdown.Item onClick={() => setDarkMode(!darkMode)}>
// //                   <FaUserCog className="me-2" /> {darkMode ? 'Light Mode' : 'Dark Mode'}
// //                 </Dropdown.Item>
// //               </Dropdown.Menu>
// //             </Dropdown>
// //           </div>
// //         </Container>
// //       </Navbar>

// //       {/* 🔔 Notifications Drawer */}
// //       <Offcanvas show={showNotifications} onHide={() => setShowNotifications(false)} placement="end">
// //         <Offcanvas.Header closeButton>
// //           <Offcanvas.Title>🔔 Notifications</Offcanvas.Title>
// //         </Offcanvas.Header>
// //         <Offcanvas.Body>
// //           {loadingNotifications ? (
// //             <div className="text-center">
// //               <Spinner animation="border" />
// //             </div>
// //           ) : (
// //             <ul className="list-unstyled">
// //               {notifications.length === 0 ? (
// //                 <li className="text-muted">No new notifications.</li>
// //               ) : (
// //                 notifications.map((note, idx) => (
// //                   <li key={idx} className="mb-2">• {note.message}</li>
// //                 ))
// //               )}
// //             </ul>
// //           )}
// //         </Offcanvas.Body>
// //       </Offcanvas>

// //       {/* 🧑 Profile Edit Modal */}
// //       <Modal show={showProfile} onHide={() => setShowProfile(false)} centered>
// //         <Modal.Header closeButton>
// //           <Modal.Title>Edit Profile</Modal.Title>
// //         </Modal.Header>
// //         <Modal.Body>
// //           <Form>
// //             <Form.Group className="mb-3">
// //               <Form.Label>Name</Form.Label>
// //               <Form.Control
// //                 type="text"
// //                 value={profile.name}
// //                 onChange={(e) => setProfile({ ...profile, name: e.target.value })}
// //               />
// //             </Form.Group>
// //             <Form.Group>
// //               <Form.Label>Email</Form.Label>
// //               <Form.Control
// //                 type="email"
// //                 value={profile.email}
// //                 onChange={(e) => setProfile({ ...profile, email: e.target.value })}
// //               />
// //             </Form.Group>
// //           </Form>
// //         </Modal.Body>
// //         <Modal.Footer>
// //           <Button variant="secondary" onClick={() => setShowProfile(false)}>Cancel</Button>
// //           <Button variant="primary" onClick={handleProfileSave}>Save Changes</Button>
// //         </Modal.Footer>
// //       </Modal>
// //     </>
// //   );
// // };

// // export default TopBar;
  

// import React, { useState, useEffect } from 'react';
// import {
//   Navbar,
//   Container,
//   Button,
//   Dropdown,
//   Modal,
//   Form,
//   Offcanvas,
//   Spinner,
//   Badge
// } from 'react-bootstrap';
// import {
//   FaBell,
//   FaEnvelope,
//   FaUser,
//   FaUserCog,
//   FaBars,
//   FaTimes,
//   FaSignOutAlt,
//   FaEdit
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const TopBar = ({ darkMode, setDarkMode, showSidebar, toggleSidebar }) => {
//   const navigate = useNavigate();

//   const [showProfileModal, setShowProfileModal] = useState(false);
//   const [profileName, setProfileName] = useState('');
//   const [profileEmail, setProfileEmail] = useState('');

//   const [showNotifications, setShowNotifications] = useState(false);
//   const [notifications, setNotifications] = useState([]);
//   const [loadingNotifications, setLoadingNotifications] = useState(true);

//   useEffect(() => {
//     const storedName = localStorage.getItem('profileName') || 'Admin';
//     const storedEmail = localStorage.getItem('profileEmail') || 'admin@example.com';
//     setProfileName(storedName);
//     setProfileEmail(storedEmail);
//   }, []);

//   const fetchNotifications = async () => {
//     try {
//       setLoadingNotifications(true);
//       const response = await axios.get('https://your-backend-api.com/api/notifications');
//       setNotifications(response.data || []);
//     } catch (err) {
//       console.error('Failed to fetch notifications:', err);
//     } finally {
//       setLoadingNotifications(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//     const interval = setInterval(fetchNotifications, 10000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     navigate('/');
//   };

//   const handleProfileSave = () => {
//     localStorage.setItem('profileName', profileName);
//     localStorage.setItem('profileEmail', profileEmail);
//     setShowProfileModal(false);
//   };

//   const handleEmailClick = () => {
//     window.open('https://mail.google.com', '_blank');
//   };

//   return (
//     <>
//       <Navbar
//         bg={darkMode ? 'dark' : 'light'}
//         variant={darkMode ? 'dark' : 'light'}
//         className="top-nav fixed-top px-2"
//         expand="lg"
//         style={{ zIndex: 1030 }}
//       >
//         <Container fluid className="d-flex justify-content-between align-items-center">
//           {/* Left: Logo + Sidebar Toggle */}
//           <div className="d-flex align-items-center">
//             <Button variant="link" className="me-2 p-0" onClick={toggleSidebar}>
//               {showSidebar ? <FaTimes className="fs-4" /> : <FaBars className="fs-4" />}
//             </Button>
//             <Navbar.Brand className="fw-bold d-flex align-items-center">
//               <img
//                 src="/NOVYA LOGO (1).png"
//                 alt="NOVYA Logo"
//                 style={{ width: '70px', height: '50px', marginRight: '10px', borderRadius: '5px' }}
//               />
//               <img
//                src="/NOVYA TITLE.png"
//                alt="NOVYA Title"
//                style={{ height: '200px', width: 'auto', objectFit: 'contain' }}
//                className="d-none d-sm-inline"
//               />

//             </Navbar.Brand>
//           </div>

//           {/* Right: Actions */}
//           <div className="d-flex align-items-center gap-3">
//             {/* 🔔 Notifications */}
//             <Button
//               variant="link"
//               className="position-relative p-0"
//               onClick={() => setShowNotifications(true)}
//               aria-label="Notifications"
//             >
//               <FaBell className="fs-5" />
//               {notifications.length > 0 && (
//                 <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
//                   {notifications.length}
//                 </Badge>
//               )}
//             </Button>

//             {/* 📧 Mail */}
//             <Button variant="link" className="p-0" onClick={handleEmailClick} aria-label="Mail">
//               <FaEnvelope className="fs-5" />
//             </Button>

//             {/* Profile Info */}
//             <div className="d-none d-md-flex flex-column text-end me-2">
//               <div className="fw-bold">{profileName}</div>
//               <small className="text-muted">{profileEmail}</small>
//             </div>

//             {/* Dropdown */}
//             <Dropdown align="end">
//               <Dropdown.Toggle variant="link" className="p-0">
//                 <FaUser className="fs-5" />
//               </Dropdown.Toggle>
//               <Dropdown.Menu>
//                 <Dropdown.Item onClick={() => setShowProfileModal(true)}>
//                   <FaEdit className="me-2" />
//                   View/Edit Profile
//                 </Dropdown.Item>
//                 <Dropdown.Item onClick={() => setDarkMode(!darkMode)}>
//                   <FaUserCog className="me-2" />
//                   {darkMode ? 'Light Mode' : 'Dark Mode'}
//                 </Dropdown.Item>
//                 <Dropdown.Divider />
//                 <Dropdown.Item onClick={handleLogout}>
//                   <FaSignOutAlt className="me-2" />
//                   Logout
//                 </Dropdown.Item>
//               </Dropdown.Menu>
//             </Dropdown>
//           </div>
//         </Container>
//       </Navbar>

//       {/* 🔐 Edit Profile Modal */}
//       <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Profile</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 value={profileName}
//                 onChange={(e) => setProfileName(e.target.value)}
//                 placeholder="Enter your name"
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Email</Form.Label>
//               <Form.Control
//                 type="email"
//                 value={profileEmail}
//                 onChange={(e) => setProfileEmail(e.target.value)}
//                 placeholder="Enter your email"
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowProfileModal(false)}>Cancel</Button>
//           <Button variant="primary" onClick={handleProfileSave}>Save Changes</Button>
//         </Modal.Footer>
//       </Modal>

//       {/* 🛎️ Notification Drawer */}
//       <Offcanvas show={showNotifications} onHide={() => setShowNotifications(false)} placement="end">
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>🔔 Notifications</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           {loadingNotifications ? (
//             <div className="text-center">
//               <Spinner animation="border" />
//             </div>
//           ) : notifications.length === 0 ? (
//             <div className="text-muted">No new notifications.</div>
//           ) : (
//             <ul className="list-unstyled">
//               {notifications.map((note, idx) => (
//                 <li key={idx} className="mb-2">• {note.message}</li>
//               ))}
//             </ul>
//           )}
//         </Offcanvas.Body>
//       </Offcanvas>
//     </>
//   );
// };

// export default TopBar;


import React, { useState, useEffect } from 'react';
import {
  Navbar,
  Container,
  Button,
  Dropdown,
  Modal,
  Form,
  Offcanvas,
  Spinner,
  Badge
} from 'react-bootstrap';
import {
  FaBell,
  FaEnvelope,
  FaUser,
  FaUserCog,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaEdit
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TopBar = ({ darkMode, setDarkMode, showSidebar, toggleSidebar }) => {
  const navigate = useNavigate();

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileName, setProfileName] = useState('');
  const [profileEmail, setProfileEmail] = useState('');

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifications, setLoadingNotifications] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem('profileName') || 'Admin';
    const storedEmail = localStorage.getItem('profileEmail') || 'admin@example.com';
    setProfileName(storedName);
    setProfileEmail(storedEmail);
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoadingNotifications(true);
      const response = await axios.get('https://your-backend-api.com/api/notifications');
      setNotifications(response.data || []);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoadingNotifications(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const handleProfileSave = () => {
    localStorage.setItem('profileName', profileName);
    localStorage.setItem('profileEmail', profileEmail);
    setShowProfileModal(false);
  };

  const handleEmailClick = () => {
    window.open('https://mail.google.com', '_blank');
  };

  return (
    <>
      <Navbar
        bg={darkMode ? 'dark' : 'light'}
        variant={darkMode ? 'dark' : 'light'}
        className="top-nav fixed-top px-2"
        expand="lg"
        style={{ zIndex: 1030 }}
      >
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Left: Logo + Sidebar Toggle */}
          <div className="d-flex align-items-center">
            <Button variant="link" className="me-2 p-0" onClick={toggleSidebar}>
              {showSidebar ? <FaTimes className="fs-4" /> : <FaBars className="fs-4" />}
            </Button>
            <Navbar.Brand className="fw-bold d-flex align-items-center">
              <img
                src="/NOVYA LOGO (1).png"
                alt="NOVYA Logo"
                style={{ width: '60px', height: '60px', marginRight: '10px', borderRadius: '5px' }}
              />
              <span
                className="d-none d-sm-inline fw-bold"
                style={{
                  fontSize: '1.8rem',
                  background: 'linear-gradient(90deg, #6D0DAD, #C316A4, #F02D6D, #FF5E52, #FF8547)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                NOVYA
              </span>
            </Navbar.Brand>
          </div>

          {/* Right: Actions */}
          <div className="d-flex align-items-center gap-3">
            {/* 🔔 Notifications */}
            <Button
              variant="link"
              className="position-relative p-0"
              onClick={() => setShowNotifications(true)}
              aria-label="Notifications"
            >
              <FaBell className="fs-5" />
              {notifications.length > 0 && (
                <Badge pill bg="danger" className="position-absolute top-0 start-100 translate-middle">
                  {notifications.length}
                </Badge>
              )}
            </Button>

            {/* 📧 Mail */}
            <Button variant="link" className="p-0" onClick={handleEmailClick} aria-label="Mail">
              <FaEnvelope className="fs-5" />
            </Button>

            {/* Profile Info */}
            <div className="d-none d-md-flex flex-column text-end me-2">
              <div className="fw-bold">{profileName}</div>
              <small className="text-muted">{profileEmail}</small>
            </div>

            {/* Dropdown */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="p-0">
                <FaUser className="fs-5" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setShowProfileModal(true)}>
                  <FaEdit className="me-2" />
                  View/Edit Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setDarkMode(!darkMode)}>
                  <FaUserCog className="me-2" />
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  <FaSignOutAlt className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Container>
      </Navbar>

      {/* 🔐 Edit Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleProfileSave}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* 🛎️ Notification Drawer */}
      <Offcanvas show={showNotifications} onHide={() => setShowNotifications(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>🔔 Notifications</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {loadingNotifications ? (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-muted">No new notifications.</div>
          ) : (
            <ul className="list-unstyled">
              {notifications.map((note, idx) => (
                <li key={idx} className="mb-2">• {note.message}</li>
              ))}
            </ul>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default TopBar;
