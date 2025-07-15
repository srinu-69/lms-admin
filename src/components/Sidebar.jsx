// import React, { useState } from 'react';
// import { Nav, Offcanvas, Form, InputGroup } from 'react-bootstrap';
// import {
//   FaTachometerAlt, FaMoneyBill, FaChartLine, FaAward,
//   FaTicketAlt, FaHeadset, FaHistory, FaUserClock,
//   FaUserPlus, FaUsers, FaSearch
// } from 'react-icons/fa';

// const Sidebar = ({ showSidebar, darkMode, setActiveComponent, setShowSidebar }) => {
//   const [searchQuery, setSearchQuery] = useState('');

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
//         <div className="d-flex align-items-center">
//           {/* LOGO */}
//           <img
//             src="/NOVYA LOGO (1).png"
//             alt="NOVYA Logo"
//             style={{
//               width: '50px',
//               height: '70px',
//               marginRight: '10px',
//               borderRadius: '10px',
//               objectFit: 'cover',
//               background: 'white',
//             }}
//           />

//           {/* TITLE IMAGE */}
//           <img
//             src="/NOVYA TITLE.png"
//             alt="NOVYA Title"
//             style={{
//               height: '170px',     // increase for larger size
//               objectFit: 'contain',
//               maxWidth: '180px',
//             }}
//           />
//         </div>
//       </Offcanvas.Header>

//       <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
//         {/* 🔍 Search */}
//         <Form className="mb-3">
//           <InputGroup>
//             <InputGroup.Text>
//               <FaSearch />
//             </InputGroup.Text>
//             <Form.Control
//               placeholder="Search menu..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </InputGroup>
//         </Form>

//         {/* 📁 Menu Items */}
//         <Nav className="flex-column">
//           {filteredItems.map((item) => (
//             <Nav.Link
//               key={item.name}
//               onClick={() => handleMenuItemClick(item.name)}
//               className="menu-item"
//             >
//               <span className="menu-icon me-3">{item.icon}</span>
//               <span className="menu-text">{item.name}</span>
//             </Nav.Link>
//           ))}
//         </Nav>
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
        <div className="d-flex align-items-center">
          {/* Logo Image */}
          <img
            src="/NOVYA LOGO (1).png"
            alt="NOVYA Logo"
            style={{
              width: '50px',
              height: '70px',
              marginRight: '10px',
              borderRadius: '10px',
              objectFit: 'cover',
              background: 'white',
            }}
          />

          {/* Gradient Text instead of image */}
          <h4
            className="m-0"
            style={{
              fontSize: '1.8rem',
              background: 'linear-gradient(90deg, #6D0DAD, #C316A4, #F02D6D, #FF5E52, #FF8547)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}
          >
            NOVYA
          </h4>
        </div>
      </Offcanvas.Header>

      <Offcanvas.Body style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflowY: 'auto' }}>
        {/* 🔍 Search Bar */}
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
