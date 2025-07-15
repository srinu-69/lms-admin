// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import LoginPage from './components/LoginPage';
// // import AdminDashboard from './components/AdminDashboard';

// // function App() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<LoginPage />} />
// //         <Route path="/dashboard/*" element={<AdminDashboard />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;





// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginPage from './components/LoginPage';
// import AdminDashboard from './components/AdminDashboard';

// // ✅ Protected Route wrapper
// const ProtectedRoute = ({ children }) => {
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LoginPage />} />
//         <Route
//           path="/dashboard/*"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// App.js or Routes.js
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminDashboard from './components/AdminDashboard';

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isAuthenticated');
  return isAuth ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
