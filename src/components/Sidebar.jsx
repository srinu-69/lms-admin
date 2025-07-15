// // // import React, { useState } from 'react';
// // // import { Nav, Offcanvas, Button, Form, InputGroup } from 'react-bootstrap';
// // // import {
// // //   FaTachometerAlt, FaMoneyBill, FaChartLine, FaAward,
// // //   FaTicketAlt, FaHeadset, FaHistory, FaUserClock,
// // //   FaUserPlus, FaUsers, FaSignOutAlt, FaSearch
// // // } from 'react-icons/fa';
// // // import { useNavigate } from 'react-router-dom';

// // // const Sidebar = ({ showSidebar, darkMode, setActiveComponent, setShowSidebar }) => {
// // //   const [searchQuery, setSearchQuery] = useState('');
// // //   const navigate = useNavigate();

// // //   const menuItems = [
// // //     { name: 'Overview', icon: <FaTachometerAlt /> },
// // //     { name: 'Payments', icon: <FaMoneyBill /> },
// // //     { name: 'Progress', icon: <FaChartLine /> },
// // //     { name: 'Rewards', icon: <FaAward /> },
// // //     { name: 'Tickets', icon: <FaTicketAlt /> },
// // //     { name: 'Support', icon: <FaHeadset /> },
// // //     { name: 'Recent Actions', icon: <FaHistory /> },
// // //     { name: 'Recent Activity', icon: <FaUserClock /> },
// // //     { name: 'Registrations', icon: <FaUserPlus /> },
// // //     { name: 'Users', icon: <FaUsers /> },
// // //   ];

// // //   const handleMenuItemClick = (name) => {
// // //     setActiveComponent(name);
// // //     if (window.innerWidth <= 992) {
// // //       setShowSidebar(false);
       
// // //     }
// // //   };

// // //   const handleLogout = () => {
// // //     localStorage.removeItem('isAuthenticated');
// // //     navigate('/');
// // //   };

// // //   const filteredItems = menuItems.filter((item) =>
// // //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
// // //   );

// // //   return (
// // //     <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} responsive="lg" className="sidebar">
// // //       <Offcanvas.Header closeButton closeVariant={darkMode ? 'white' : undefined}>
// // //  <img
// // //       src="/NOVYA LOGO.png"
// // //       alt="NOVYA Logo"
// // //       style={{
// // //         width: '50px',
// // //         height: '50px',
// // //         marginRight: '10px',
// // //         borderRadius: '10px',
// // //         objectFit: 'cover',
// // //         background: 'white'
// // //       }}
// // //     />
// // //         <Offcanvas.Title className="sidebar-title gradient-heading"> NOVYA ADMIN MENU</Offcanvas.Title>

// // //       </Offcanvas.Header>

// // //       <Offcanvas.Body className="d-flex flex-column justify-content-between h-100">
// // //         {/* 🔍 Search Bar */}
// // //         <Form className="mb-3">
// // //           <InputGroup>
// // //             <InputGroup.Text><FaSearch /></InputGroup.Text>
// // //             <Form.Control
// // //               placeholder="Search menu..."
// // //               value={searchQuery}
// // //               onChange={(e) => setSearchQuery(e.target.value)}
// // //             />
// // //           </InputGroup>
// // //         </Form>

// // //         {/* 📁 Menu Items */}
// // //         <Nav className="flex-column">
// // //           {filteredItems.map((item) => (
// // //             <Nav.Link
// // //               key={item.name}
// // //               onClick={() => handleMenuItemClick(item.name)}
// // //               className="menu-item"
// // //             >
// // //               <span className="menu-icon me-3">{item.icon}</span>
// // //               <span className="menu-text">{item.name}</span>
// // //             </Nav.Link>
// // //           ))}
// // //         </Nav>

// // //         {/* 🚪 Logout */}
// // //         <div className="mt-auto pt-3 border-top">
// // //           <Button variant="outline-danger" className="w-100" onClick={handleLogout}>
// // //             <FaSignOutAlt className="me-2" />
// // //             Logout
// // //           </Button>
// // //         </div>
// // //       </Offcanvas.Body>
// // //     </Offcanvas>
// // //   );
// // // };

// // // export default Sidebar;
// // import React, { useState } from 'react';
// // import { Nav, Offcanvas, Button, Form, InputGroup } from 'react-bootstrap';
// // import {
// //   FaTachometerAlt, FaMoneyBill, FaChartLine, FaAward,
// //   FaTicketAlt, FaHeadset, FaHistory, FaUserClock,
// //   FaUserPlus, FaUsers, FaSignOutAlt, FaSearch
// // } from 'react-icons/fa';
// // import { useNavigate } from 'react-router-dom';

// // const Sidebar = ({ showSidebar, darkMode, setActiveComponent, setShowSidebar }) => {
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const navigate = useNavigate();

// //   const menuItems = [
// //     { name: 'Overview', icon: <FaTachometerAlt /> },
// //     { name: 'Payments', icon: <FaMoneyBill /> },
// //     { name: 'Progress', icon: <FaChartLine /> },
// //     { name: 'Rewards', icon: <FaAward /> },
// //     { name: 'Tickets', icon: <FaTicketAlt /> },
// //     { name: 'Support', icon: <FaHeadset /> },
// //     { name: 'Recent Actions', icon: <FaHistory /> },
// //     { name: 'Recent Activity', icon: <FaUserClock /> },
// //     { name: 'Registrations', icon: <FaUserPlus /> },
// //     { name: 'Users', icon: <FaUsers /> },
// //   ];

// //   const handleMenuItemClick = (name) => {
// //     setActiveComponent(name);
// //     if (window.innerWidth <= 992) {
// //       setShowSidebar(false);
// //     }
// //   };

// //   const handleLogout = () => {
// //     localStorage.removeItem('isAuthenticated');
// //     navigate('/');
// //   };

// //   const filteredItems = menuItems.filter((item) =>
// //     item.name.toLowerCase().includes(searchQuery.toLowerCase())
// //   );

// //   return (
// //     <Offcanvas
// //       show={showSidebar}
// //       onHide={() => setShowSidebar(false)}
// //       responsive="lg"
// //       className="sidebar"
// //       backdrop={false}
// //     >
// //       <Offcanvas.Header closeButton closeVariant={darkMode ? 'white' : undefined}>
// //         <img
// //           src="/NOVYA LOGO.png"
// //           alt="NOVYA Logo"
// //           style={{
// //             width: '50px',
// //             height: '50px',
// //             marginRight: '10px',
// //             borderRadius: '10px',
// //             objectFit: 'cover',
// //             background: 'white',
// //           }}
// //         />
// //         <Offcanvas.Title className="sidebar-title gradient-heading">
// //           NOVYA ADMIN MENU
// //         </Offcanvas.Title>
// //       </Offcanvas.Header>

// //       <Offcanvas.Body className="d-flex flex-column h-100">
// //         {/* 🔍 Search */}
// //         <div>
// //           <Form className="mb-3">
// //             <InputGroup>
// //               <InputGroup.Text>
// //                 <FaSearch />
// //               </InputGroup.Text>
// //               <Form.Control
// //                 placeholder="Search menu..."
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //               />
// //             </InputGroup>
// //           </Form>

// //           {/* 📁 Menu Items */}
// //           <Nav className="flex-column">
// //             {filteredItems.map((item) => (
// //               <Nav.Link
// //                 key={item.name}
// //                 onClick={() => handleMenuItemClick(item.name)}
// //                 className="menu-item"
// //               >
// //                 <span className="menu-icon me-3">{item.icon}</span>
// //                 <span className="menu-text">{item.name}</span>
// //               </Nav.Link>
// //             ))}
// //           </Nav>
// //         </div>

// //         {/* 🚪 Logout - Always sticks to bottom */}
// //         <div className="mt-auto pt-3 border-top">
// //           <Button variant="outline-danger" className="w-100" onClick={handleLogout}>
// //             <FaSignOutAlt className="me-2" />
// //             Logout
// //           </Button>
// //         </div>
// //       </Offcanvas.Body>
// //     </Offcanvas>
// //   );
// // };

// // export default Sidebar;
// import React, { useState } from 'react';
// import { Nav, Offcanvas, Button, Form, InputGroup } from 'react-bootstrap';
// import {
//   FaTachometerAlt, FaMoneyBill, FaChartLine, FaAward,
//   FaTicketAlt, FaHeadset, FaHistory, FaUserClock,
//   FaUserPlus, FaUsers, FaSignOutAlt, FaSearch
// } from 'react-icons/fa';
// import { useNavigate } from 'react-router-dom';

// const Sidebar = ({ showSidebar, darkMode, setActiveComponent, setShowSidebar }) => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigate = useNavigate();

//   const menuItems = [
//     { name: 'Overview', icon: <FaTachometerAlt /> },
//     { name: 'Payments', icon: <FaMoneyBill /> },
//     { name: 'Progress', icon: <FaChartLine /> },
//     { name: 'Rewards', icon: <FaAward /> },
//     { name: 'Tickets', icon: <FaTicketAlt /> },
//     { name: 'Support', icon: <FaHeadset /> },
//     { name: 'Recent Actions', icon: <FaHistory /> },
//     { name: 'Recent Activity', icon: <FaUserClock /> },
//     { name: 'Registrations', icon: <FaUserPlus /> },
//     { name: 'Users', icon: <FaUsers /> },
//   ];

//   const handleMenuItemClick = (name) => {
//     setActiveComponent(name);
//     if (window.innerWidth <= 992) {
//       setShowSidebar(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('isAuthenticated');
//     navigate('/');
//   };

//   const filteredItems = menuItems.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <Offcanvas
//       show={showSidebar}
//       onHide={() => setShowSidebar(false)}
//       responsive="lg"
//       className="sidebar"
//       backdrop={false}
//     >
//       <Offcanvas.Header closeButton closeVariant={darkMode ? 'white' : undefined}>
//         <img
//           src="/NOVYA LOGO.png"
//           alt="NOVYA Logo"
//           style={{
//             width: '50px',
//             height: '50px',
//             marginRight: '10px',
//             borderRadius: '10px',
//             objectFit: 'cover',
//             background: 'white',
//           }}
//         />
//         <Offcanvas.Title className="sidebar-title gradient-heading">
//           NOVYA ADMIN MENU
//         </Offcanvas.Title>
//       </Offcanvas.Header>

//       <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
//         {/* 🔍 Search */}
//         <div>
//           <Form className="mb-3">
//             <InputGroup>
//               <InputGroup.Text>
//                 <FaSearch />
//               </InputGroup.Text>
//               <Form.Control
//                 placeholder="Search menu..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </InputGroup>
//           </Form>

//           {/* 📁 Menu Items */}
//           <Nav className="flex-column">
//             {filteredItems.map((item) => (
//               <Nav.Link
//                 key={item.name}
//                 onClick={() => handleMenuItemClick(item.name)}
//                 className="menu-item"
//               >
//                 <span className="menu-icon me-3">{item.icon}</span>
//                 <span className="menu-text">{item.name}</span>
//               </Nav.Link>
//             ))}
//           </Nav>
//         </div>

//         {/* 🚪 Logout - Always visible */}
//         <div className="mt-auto pt-3 border-top">
//           <Button variant="outline-danger" className="w-100" onClick={handleLogout}>
//             <FaSignOutAlt className="me-2" />
//             Logout
//           </Button>
//         </div>
//       </Offcanvas.Body>
//     </Offcanvas>
//   );
// };

// export default Sidebar;
   


import React, { useState } from 'react';
import { Nav, Offcanvas, Form, InputGroup } from 'react-bootstrap';
import {
  FaTachometerAlt, FaMoneyBill, FaChartLine, FaAward,
  FaTicketAlt, FaHeadset, FaHistory, FaUserClock,
  FaUserPlus, FaUsers, FaSearch
} from 'react-icons/fa';
const Sidebar = ({ showSidebar, darkMode, setActiveComponent, setShowSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const menuItems = [
    { name: 'Overview', icon: <FaTachometerAlt /> },
    { name: 'Payments', icon: <FaMoneyBill /> },
    { name: 'Progress', icon: <FaChartLine /> },
    { name: 'Rewards', icon: <FaAward /> },
    { name: 'Tickets', icon: <FaTicketAlt /> },
    { name: 'Support', icon: <FaHeadset /> },
    { name: 'Recent Actions', icon: <FaHistory /> },
    { name: 'Recent Activity', icon: <FaUserClock /> },
    { name: 'Registrations', icon: <FaUserPlus /> },
    { name: 'Users', icon: <FaUsers /> },
  ];

  const handleMenuItemClick = (name) => {
    setActiveComponent(name);
    if (window.innerWidth <= 992) {
      setShowSidebar(false);
    }
  };
  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Offcanvas
      show={showSidebar}
      onHide={() => setShowSidebar(false)}
      responsive="lg"
      className="sidebar"
      backdrop={false}
    >
      <Offcanvas.Header closeButton closeVariant={darkMode ? 'white' : undefined}>
        <img
          src="/NOVYA LOGO.png"
          alt="NOVYA Logo"
          style={{
            width: '50px',
            height: '50px',
            marginRight: '10px',
            borderRadius: '10px',
            objectFit: 'cover',
            background: 'white',
          }}
        />
        <Offcanvas.Title className="sidebar-title gradient-heading">
          NOVYA ADMIN MENU
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        {/* 🔍 Search */}
        <Form className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Form>

        {/* 📁 Menu Items */}
        <Nav className="flex-column">
          {filteredItems.map((item) => (
            <Nav.Link
              key={item.name}
              onClick={() => handleMenuItemClick(item.name)}
              className="menu-item"
            >
              <span className="menu-icon me-3">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </Nav.Link>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};
export default Sidebar;
