import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setCurrentAdmin } from '../utils/storage.js';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple admin credentials (in a real app, this would be more secure)
    if (formData.email === 'admin@eventflow.com' && formData.password === 'admin123') {
      setCurrentAdmin({ email: formData.email, role: 'admin' });
      navigate('/admin-panel');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="admin-shell">
      <div className="auth-form card-panel">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="button primary">Login as Admin</button>
        </form>
        <p className="footnote">
          <strong>Demo Credentials:</strong><br />
          Email: admin@eventflow.com<br />
          Password: admin123
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;