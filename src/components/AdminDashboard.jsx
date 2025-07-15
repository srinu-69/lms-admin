import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

import Overview from './pages/Overview';
import Payments from './pages/Payments';
import Progress from './pages/Progress';
import Rewards from './pages/Rewards';
import Tickets from './pages/Tickets';
import Support from './pages/Support';
import RecentActions from './pages/RecentActions';
import RecentActivity from './pages/RecentActivity';
import Registrations from './pages/Registrations';
import Users from './pages/Users';

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeComponent, setActiveComponent] = useState('Overview');

  // ✅ Update browser tab title based on active section
  useEffect(() => {
    const titles = {
      'Overview': 'Dashboard Overview',
      'Payments': 'Payment Reports',
      'Progress': 'Student Progress',
      'Rewards': 'Rewards & Recognition',
      'Tickets': 'Support Tickets',
      'Support': 'Customer Support',
      'Recent Actions': 'Recent Admin Actions',
      'Recent Activity': 'User Activity Logs',
      'Registrations': 'New Registrations',
      'Users': 'User Management'
    };

    if (titles[activeComponent]) {
      document.title = `${titles[activeComponent]} | Prime Minds - Admin Panel`;
    } else {
      document.title = 'Admin Dashboard | Prime Minds - Admin Panel';
    }
  }, [activeComponent]);

  // ✅ Render the selected component
  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'Overview': return <Overview />;
      case 'Payments': return <Payments />;
      case 'Progress': return <Progress />;
      case 'Rewards': return <Rewards />;
      case 'Tickets': return <Tickets />;
      case 'Support': return <Support />;
      case 'Recent Actions': return <RecentActions />;
      case 'Recent Activity': return <RecentActivity />;
      case 'Registrations': return <Registrations />;
      case 'Users': return <Users />;
      default: return <Overview />;
    }
  };

  return (
    <div className={`admin-dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <TopBar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showSidebar={showSidebar}
        toggleSidebar={() => setShowSidebar(!showSidebar)}
      />

      <Sidebar
        showSidebar={showSidebar}
        darkMode={darkMode}
        setActiveComponent={setActiveComponent}
        setShowSidebar={setShowSidebar}
      />

      <main className="main-content">
        <Container fluid className="py-4">
          {renderActiveComponent()}
        </Container>
      </main>
    </div>
  );
};

export default AdminDashboard;
