import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { findUser, setCurrentUser } from '../utils/storage.js';

function Login() {
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

    const user = findUser(formData.email);
    if (!user || user.password !== formData.password) {
      setError('Invalid email or password');
      return;
    }

    setCurrentUser(user);
    navigate('/dashboard');
  };

  return (
    <div className="auth-shell">
      <div className="auth-form card-panel">
        <h2>Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
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
          <button type="submit" className="button primary">Login</button>
        </form>
        <p className="footnote">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;