
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Row, Col, Card, Table, Badge, Alert } from 'react-bootstrap';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { FaChartBar, FaUsers, FaUser, FaTicketAlt } from 'react-icons/fa';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// ✨ Animation Style
const fadeInStyle = {
  opacity: 0,
  transform: 'translateY(20px)',
  animation: 'fadeInUp 0.6s forwards',
};

const fadeInDelay = (delay) => ({
  ...fadeInStyle,
  animationDelay: `${delay}s`
});

// Inject keyframes into global stylesheet once
if (typeof document !== "undefined") {
  const styleSheet = document.styleSheets[0];
  const keyframes = `
    @keyframes fadeInUp {
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  if ([...styleSheet.cssRules].findIndex(r => r.name === 'fadeInUp') === -1) {
    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }
}

const Overview = () => {
  const chartRef1 = useRef(null);
  const chartRef2 = useRef(null);

  const [stats, setStats] = useState({ revenue: 0, newUsers: 0, totalUsers: 0, solvedTickets: 0, pendingTickets: 0 });
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, regRes, statRes] = await Promise.all([
          axios.get('/api/users'),
          axios.get('/api/registrations'),
          axios.get('/api/stats')
        ]);
        setUsers(userRes.data);
        setRegistrations(regRes.data);
        setStats(statRes.data);

        localStorage.setItem('users', JSON.stringify(userRes.data));
        localStorage.setItem('registrations', JSON.stringify(regRes.data));
        localStorage.setItem('overviewStats', JSON.stringify(statRes.data));
      } catch (err) {
        console.error('Error fetching from backend, loading localStorage instead:', err.message);
        const localUsers = JSON.parse(localStorage.getItem('users')) || [];
        const localRegs = JSON.parse(localStorage.getItem('registrations')) || [];
        const localStats = JSON.parse(localStorage.getItem('overviewStats')) || {
          revenue: 12500, newUsers: localUsers.length, totalUsers: localUsers.length + 20,
          solvedTickets: 45, pendingTickets: 12
        };
        setUsers(localUsers);
        setRegistrations(localRegs);
        setStats(localStats);
        setError("Backend not connected, showing local data.");
      }
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const ticketsData = {
    labels: ['Solved', 'Pending', 'Failed'],
    datasets: [{
      label: 'Tickets Status',
      data: [stats.solvedTickets, stats.pendingTickets, 8],
      backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
    }]
  };

  const classPerformanceData = {
    labels: Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`),
    datasets: [{
      label: 'Average Score (%)',
      data: [78, 82, 75, 85, 90, 88, 79, 83, 87, 84, 81, 89],
      backgroundColor: '#2196F3'
    }]
  };

  if (loading) return <div className="p-4">Loading Overview...</div>;

  return (
    <div className="overview-page p-3">
      {error && <Alert variant="warning">{error}</Alert>}

      <Row className="mb-4">
        <Col md={3}><div style={fadeInDelay(0.1)}><StatCard icon={<FaChartBar />} title="Monthly Revenue" value={`₹${stats.revenue.toLocaleString()}`} bg="primary" /></div></Col>
        <Col md={3}><div style={fadeInDelay(0.2)}><StatCard icon={<FaUsers />} title="New Users" value={stats.newUsers} bg="success" /></div></Col>
        <Col md={3}><div style={fadeInDelay(0.3)}><StatCard icon={<FaUser />} title="Total Users" value={stats.totalUsers} bg="info" /></div></Col>
        <Col md={3}><div style={fadeInDelay(0.4)}><StatCard icon={<FaTicketAlt />} title="Solved/Pending Tickets" value={`${stats.solvedTickets}/${stats.pendingTickets}`} bg="warning" /></div></Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}><div style={fadeInDelay(0.5)}><ChartCard title="Ticket Status" data={ticketsData} ref={chartRef1} /></div></Col>
        <Col md={6}><div style={fadeInDelay(0.6)}><ChartCard title="Class Performance" data={classPerformanceData} ref={chartRef2} maxY={100} /></div></Col>
      </Row>

      <Row>
        <Col md={6}><div style={fadeInDelay(0.7)}><DataTable title="Users" data={users} columns={['Name', 'Email', 'Role', 'Status']} isUser /></div></Col>
        <Col md={6}><div style={fadeInDelay(0.8)}><DataTable title="Registrations" data={registrations} columns={['Name', 'Type', 'Date', 'Status']} /></div></Col>
      </Row>
    </div>
  );
};

const StatCard = ({ icon, title, value, bg }) => (
  <Card className="stat-card text-center h-100 shadow">
    <Card.Body>
      <div className={`stat-icon bg-${bg} mb-2 p-2 text-white rounded`}>{icon}</div>
      <h4>{value}</h4>
      <p className="text-muted">{title}</p>
    </Card.Body>
  </Card>
);

const ChartCard = React.forwardRef(({ title, data, maxY }, ref) => (
  <Card className="h-100 shadow">
    <Card.Body>
      <Card.Title className="text-center">{title}</Card.Title>
      <div style={{ height: '250px' }}>
        <Bar
          ref={ref}
          data={data}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: maxY ? { y: { beginAtZero: true, max: maxY } } : undefined,
            plugins: {
              legend: { position: 'top' },
              title: { display: true, text: title }
            }
          }}
        />
      </div>
    </Card.Body>
  </Card>
));

const DataTable = ({ title, data, columns, isUser = false }) => (
  <Card className="h-100 shadow">
    <Card.Body>
      <Card.Title className="text-center">{title}</Card.Title>
      <Table hover responsive>
        <thead>
          <tr>{columns.map(col => <th key={col}>{col}</th>)}</tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{isUser ? item.email : item.type}</td>
              <td>{isUser ? item.role : item.date}</td>
              <td>
                <Badge bg={
                  item.status === 'Approved' || item.status === 'Active' ? 'success' :
                  item.status === 'Pending' ? 'warning' : 'danger'
                }>
                  {item.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card.Body>
  </Card>
);

export default Overview;












