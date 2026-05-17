const LOCAL_STORAGE_USERS = 'eventBookingUsers';
const LOCAL_STORAGE_EVENTS = 'eventBookingEvents';
const LOCAL_STORAGE_BOOKINGS = 'eventBookingBookings';
const LOCAL_STORAGE_CURRENT_USER = 'eventBookingCurrentUser';
const LOCAL_STORAGE_CURRENT_ADMIN = 'eventBookingCurrentAdmin';

const initialEvents = [
  {
    id: 'ev1',
    title: 'Campus Innovation Summit',
    date: '2026-06-10',
    venue: 'Main Auditorium',
    capacity: 120,
    price: 0,
    description: 'A showcase of internal R&D ideas, technology demos, and rapid innovation talks.',
  },
  {
    id: 'ev2',
    title: 'Leadership Seminar',
    date: '2026-06-18',
    venue: 'Executive Hall',
    capacity: 90,
    price: 0,
    description: 'Practical leadership strategies, team building, and project success frameworks.',
  },
  {
    id: 'ev3',
    title: 'Design & Development Workshop',
    date: '2026-07-02',
    venue: 'Tech Lab 3',
    capacity: 80,
    price: 0,
    description: 'Hands-on workshop focused on product design, prototyping, and collaboration tools.',
  },
];

const readJson = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getUsers = () => readJson(LOCAL_STORAGE_USERS, []);
export const saveUsers = (users) => writeJson(LOCAL_STORAGE_USERS, users);
export const getEvents = () => {
  const events = readJson(LOCAL_STORAGE_EVENTS, null);
  if (!events) {
    writeJson(LOCAL_STORAGE_EVENTS, initialEvents);
    return initialEvents;
  }
  return events;
};
export const saveEvents = (events) => writeJson(LOCAL_STORAGE_EVENTS, events);
export const getBookings = () => readJson(LOCAL_STORAGE_BOOKINGS, []);
export const saveBookings = (bookings) => writeJson(LOCAL_STORAGE_BOOKINGS, bookings);
export const getCurrentUser = () => readJson(LOCAL_STORAGE_CURRENT_USER, null);
export const setCurrentUser = (user) => writeJson(LOCAL_STORAGE_CURRENT_USER, user);
export const clearCurrentUser = () => localStorage.removeItem(LOCAL_STORAGE_CURRENT_USER);
export const getCurrentAdmin = () => readJson(LOCAL_STORAGE_CURRENT_ADMIN, null);
export const setCurrentAdmin = (admin) => writeJson(LOCAL_STORAGE_CURRENT_ADMIN, admin);
export const clearCurrentAdmin = () => localStorage.removeItem(LOCAL_STORAGE_CURRENT_ADMIN);

export const findUser = (email) => getUsers().find((user) => user.email === email.toLowerCase());
export const findEvent = (id) => getEvents().find((event) => event.id === id);