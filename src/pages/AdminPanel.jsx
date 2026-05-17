import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCurrentAdmin, getBookings, getCurrentAdmin, getEvents, saveEvents } from '../utils/storage.js';

function AdminPanel() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    venue: '',
    capacity: '',
    description: '',
  });
  const admin = getCurrentAdmin();

  useEffect(() => {
    if (!admin) {
      navigate('/admin');
      return;
    }
    setEvents(getEvents());
    setBookings(getBookings());
  }, [navigate, admin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: `ev-${Date.now()}`,
      title: formData.title,
      date: formData.date,
      venue: formData.venue,
      capacity: parseInt(formData.capacity),
      price: 0, // Free for internal events
      description: formData.description,
    };

    const updated = [...events, newEvent];
    saveEvents(updated);
    setEvents(updated);
    setFormData({
      title: '',
      date: '',
      venue: '',
      capacity: '',
      description: '',
    });
    setShowForm(false);
  };

  const handleLogout = () => {
    clearCurrentAdmin();
    navigate('/');
  };

  return (
    <div className="admin-page">
      <div className="admin-header card-panel">
        <div>
          <p className="eyebrow">Admin Dashboard</p>
          <h2>Event Management</h2>
          <p>Manage events and view booking analytics.</p>
        </div>
        <div>
          <button className="button primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add New Event'}
          </button>
          <button className="button secondary" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      {showForm && (
        <div className="admin-form card-panel">
          <h3>Add New Event</h3>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">Event Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="capacity">Capacity</label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            <button type="submit" className="button primary">Create Event</button>
          </form>
        </div>
      )}

      <section className="grid-section">
        <div className="panel card-panel">
          <h3>Current Events</h3>
          {events.length ? (
            events.map((eventItem) => {
              const eventBookings = bookings.filter((b) => b.eventId === eventItem.id);
              return (
                <article key={eventItem.id} className="admin-event-card">
                  <div>
                    <h4>{eventItem.title}</h4>
                    <p className="event-meta">{eventItem.date} • {eventItem.venue}</p>
                    <p>{eventItem.description}</p>
                    <p className="muted">Capacity: {eventItem.capacity} | Booked: {eventBookings.length}</p>
                  </div>
                </article>
              );
            })
          ) : (
            <p className="muted">No events created yet.</p>
          )}
        </div>

        <div className="panel card-panel">
          <h3>Recent Bookings</h3>
          {bookings.length ? (
            bookings.slice(-5).reverse().map((booking) => (
              <article key={booking.id} className="admin-event-card">
                <div>
                  <h4>{booking.eventTitle}</h4>
                  <p>{booking.userName} ({booking.userEmail})</p>
                  <p className="muted">{booking.date} • {booking.venue}</p>
                </div>
              </article>
            ))
          ) : (
            <p className="muted">No bookings yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default AdminPanel;