const venueCoordinates = {
  'Main Auditorium': { latitude: 40.7128, longitude: -74.0060, city: 'New York' },
  'Executive Hall': { latitude: 37.7749, longitude: -122.4194, city: 'San Francisco' },
  'Tech Lab 3': { latitude: 47.6062, longitude: -122.3321, city: 'Seattle' },
};

const weatherCodes = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Rain showers',
  82: 'Heavy rain showers',
  95: 'Thunderstorm',
  99: 'Thunderstorm with hail',
};

export const getVenueCoordinates = (venue) => venueCoordinates[venue] || null;

export const fetchVenueWeather = async (venue) => {
  const coords = getVenueCoordinates(venue);
  if (!coords) {
    return null;
  }

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Weather fetch failed');
  }

  const data = await response.json();
  const firstDay = 0;

  return {
    venue,
    city: coords.city,
    date: data.daily.time[firstDay],
    high: Math.round(data.daily.temperature_2m_max[firstDay]),
    low: Math.round(data.daily.temperature_2m_min[firstDay]),
    condition: weatherCodes[data.daily.weathercode[firstDay]] || 'Clear',
  };
};