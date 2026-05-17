import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="notfound-panel">
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="button primary">Go Home</Link>
    </div>
  );
}

export default NotFound;