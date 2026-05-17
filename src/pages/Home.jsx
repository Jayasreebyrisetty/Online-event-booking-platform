import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEvents } from '../utils/storage.js';
import { fetchVenueWeather } from '../utils/weather.js';

function Home() {
  const [weatherInfo, setWeatherInfo] = useState([]);

  useEffect(() => {
    const events = getEvents();

    const loadWeather = async () => {
      const values = await Promise.all(
        events.map(async (eventItem) => {
          try {
            const weather = await fetchVenueWeather(eventItem.venue);
            return { eventItem, weather };
          } catch {
            return { eventItem, weather: null };
          }
        }),
      );
      setWeatherInfo(values);
    };

    loadWeather();
  }, []);

  return (
    <>
      <section className="hero-panel">
        <div className="hero-copy">
          <span className="eyebrow">Professional department event booking</span>
          <h1>Deliver memorable internal events with intelligent ticket booking.</h1>
          <p>
            EventFlow is a polished booking platform for internal technical fests, seminars, and department celebrations. Create seamless attendee journeys, let users reserve tickets in seconds, and manage every event from a clean admin dashboard.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/register">Register Now</Link>
            <Link className="button secondary" to="/login">Login</Link>
          </div>
        </div>

        <div className="hero-visual card-panel">
          <div className="stat-card">
            <h3>Built for internal teams</h3>
            <p>Perfect for seminars, tech fests, workshops, and department events.</p>
          </div>
          <div className="stat-card vibrant">
            <h3>Book with confidence</h3>
            <p>Fast ticket checkout, downloadable tickets, and event details in one place.</p>
          </div>
          <div className="stat-card">
            <h3>Admin-ready</h3>
            <p>Admins can launch events, review bookings, and track attendee details instantly.</p>
          </div>
        </div>
      </section>

      <section className="weather-panel card-panel">
        <div className="panel-heading">
          <p className="eyebrow">Live venue insight</p>
          <h2>Event weather powered by Open-Meteo</h2>
          <p>Guests can preview the weather for each event venue before booking.</p>
        </div>

        <div className="weather-grid">
          {weatherInfo.map(({ eventItem, weather }) => (
            <article key={eventItem.id} className="weather-card">
              <h4>{eventItem.title}</h4>
              <p className="event-meta">{eventItem.date} • {eventItem.venue}</p>
              {weather ? (
                <div className="weather-details">
                  <span>{weather.city}</span>
                  <strong>{weather.condition}</strong>
                  <small>{weather.high}°C / {weather.low}°C</small>
                </div>
              ) : (
                <p className="muted">Unable to load weather preview for this venue.</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;