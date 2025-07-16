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






import React, { useState, useEffect } from 'react';
import { Nav, Offcanvas, Form, InputGroup } from 'react-bootstrap';
import {
  FaTachometerAlt, FaMoneyBill, FaChartLine, FaAward,
  FaTicketAlt, FaHeadset, FaHistory, FaUserClock,
  FaUserPlus, FaUsers, FaSearch
} from 'react-icons/fa';

const Sidebar = ({ showSidebar, darkMode, setActiveComponent, setShowSidebar }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleItems, setVisibleItems] = useState([]);

  const menuItems = [
    { name: 'Overview', icon: <FaTachometerAlt style={{ color: '#03275eff' }} /> },
    { name: 'Payments', icon: <FaMoneyBill style={{ color: '#03275eff' }} /> },
    { name: 'Progress', icon: <FaChartLine style={{ color: '#03275eff' }} /> },
    { name: 'Rewards', icon: <FaAward style={{ color: '#03275eff' }} /> },
    { name: 'Tickets', icon: <FaTicketAlt style={{ color: '#03275eff' }} /> },
    { name: 'Support', icon: <FaHeadset style={{ color: '#03275eff' }} /> },
    { name: 'Recent Actions', icon: <FaHistory style={{ color: '#03275eff' }} /> },
    { name: 'Recent Activity', icon: <FaUserClock style={{ color: '#03275eff' }} /> },
    { name: 'Registrations', icon: <FaUserPlus style={{ color: '#03275eff' }} /> },
    { name: 'Users', icon: <FaUsers style={{ color: '#03275eff' }} /> },
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

  useEffect(() => {
    setVisibleItems([]);
    filteredItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems((prev) => [...prev, index]);
      }, index * 100);
    });
  },[searchQuery]);

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
        <Form className="mb-3">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch style={{ color: '#000' }} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search menu..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Form>

        <Nav className="flex-column">
          {filteredItems.map((item, index) => (
            <Nav.Link
              key={item.name}
              onClick={() => handleMenuItemClick(item.name)}
              className="menu-item"
              style={{
                opacity: visibleItems.includes(index) ? 1 : 0,
                transform: visibleItems.includes(index) ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'opacity 0.4s ease, transform 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px',
                marginBottom: '5px',
                color: '#03275eff', // ✅ text color
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, {
                  transform: 'scale(1.03)',
                  transition: 'all 0.3s ease',
                });
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, {
                  transform: 'translateX(0)',
                  transition: 'all 0.3s ease',
                });
              }}
            >
              <span className="menu-icon me-3" style={{ color: '#03275eff' }}>{item.icon}</span>
              <span className="menu-text" style={{ color: '#03275eff' }}>{item.name}</span>

            </Nav.Link>
          ))}
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;







