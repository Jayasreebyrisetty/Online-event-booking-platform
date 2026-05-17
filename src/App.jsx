import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import DataViewer from './pages/DataViewer.jsx';
import NotFound from './pages/NotFound.jsx';
import { getCurrentUser } from './utils/storage.js';

function App() {
  const location = useLocation();
  const user = getCurrentUser();
  const showHeader = location.pathname !== '/admin';

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand">
          <Link to="/">EventFlow</Link>
        </div>
        <nav className="topnav">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/data">Data</Link>
        </nav>
      </header>

      <main className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-panel" element={<AdminPanel />} />
          <Route path="/data" element={<DataViewer />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {showHeader && (
        <footer className="footer-bar">
          <p>Built for internal events: seminars, technical fests, and workshops.</p>
          <p>Secure booking, polished design, and easy ticket downloads.</p>
        </footer>
      )}
    </div>
  );
}

export default App;
