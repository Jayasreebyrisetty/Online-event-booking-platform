import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearCurrentUser, getBookings, getCurrentUser, getEvents, saveBookings } from '../utils/storage.js';

function Dashboard() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState('');
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setEvents(getEvents());
    setBookings(getBookings());
  }, [navigate, user]);

  const userBookings = useMemo(
    () => bookings.filter((booking) => booking.userEmail === user?.email),
    [bookings, user],
  );

  const availableEvents = useMemo(
    () => events.filter((eventItem) => {
      const count = bookings.filter((booking) => booking.eventId === eventItem.id).length;
      return count < eventItem.capacity;
    }),
    [events, bookings],
  );

  const handleBookTicket = (eventItem) => {
    const newBooking = {
      id: `bk-${Date.now()}`,
      userName: user.name,
      userEmail: user.email,
      eventId: eventItem.id,
      eventTitle: eventItem.title,
      date: eventItem.date,
      venue: eventItem.venue,
      bookedAt: new Date().toISOString(),
    };
    const updated = [...bookings, newBooking];
    saveBookings(updated);
    setBookings(updated);
    setMessage(`You have successfully booked a ticket for ${eventItem.title}.`);
  };

  const downloadTicket = (booking) => {
    const content = `Event Ticket\n\nName: ${booking.userName}\nEmail: ${booking.userEmail}\nEvent: ${booking.eventTitle}\nDate: ${booking.date}\nVenue: ${booking.venue}\nTicket ID: ${booking.id}\n`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${booking.eventTitle.replace(/\s+/g, '_')}_${booking.userName.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleLogout = () => {
    clearCurrentUser();
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header card-panel">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h2>{user?.name}</h2>
          <p>Choose from the latest event experiences and download your ticket instantly.</p>
        </div>
        <button className="button secondary" onClick={handleLogout}>Logout</button>
      </div>

      {message && <div className="alert-box">{message}</div>}

      <section className="grid-section">
        <div className="panel card-panel">
          <h3>Upcoming Events</h3>
          {availableEvents.length ? (
            availableEvents.map((eventItem) => (
              <article key={eventItem.id} className="event-card">
                <div>
                  <h4>{eventItem.title}</h4>
                  <p className="event-meta">{eventItem.date} • {eventItem.venue}</p>
                  <p>{eventItem.description}</p>
                </div>
                <button className="button primary" onClick={() => handleBookTicket(eventItem)}>
                  Book Ticket
                </button>
              </article>
            ))
          ) : (
            <p className="muted">No available events right now. Check back soon.</p>
          )}
        </div>

        <div className="panel card-panel">
          <h3>My Tickets</h3>
          {userBookings.length ? (
            userBookings.map((booking) => (
              <article key={booking.id} className="ticket-card">
                <h4>{booking.eventTitle}</h4>
                <p>{booking.date} • {booking.venue}</p>
                <button className="button secondary" onClick={() => downloadTicket(booking)}>Download Ticket</button>
              </article>
            ))
          ) : (
            <p className="muted">You haven&apos;t booked any tickets yet. Reserve a seat today.</p>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;