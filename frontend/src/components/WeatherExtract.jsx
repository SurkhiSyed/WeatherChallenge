import React, { useState } from 'react';
import '../components/weatherExtract.css';
import axios from 'axios';

const WeatherExtract = () => {
    const [location, setLocation] = useState('');
    const [data, setData] = useState({});
    const [error, setError] = useState('');

    const [dbCity, setDbCity] = useState('');
    const [dbResults, setDbResults] = useState([]);
    const [dbError, setDbError] = useState('');
    const [showDbResults, setShowDbResults] = useState(false);

    const searchLocation = async (event) => {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

        if (event.key === 'Enter') {
            setError('');
            setData({});
            setShowDbResults(false);
            setDbResults([]);
            try {
                const geoRes = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`
                );

                if (geoRes.data.length === 0) {
                    setError("Location not found. Please enter a valid location.");
                    return;
                }

                const { lat, lon, name } = geoRes.data[0];

                const weatherRes = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
                );

                setData(weatherRes.data);

                const firstEntry = weatherRes.data.list[0];
                const payload = {
                    timestamp: Math.floor(Date.now() / 1000),
                    location: name,
                    dt_txt: firstEntry.dt_txt,
                    temperature: firstEntry.main.temp,
                    humidity: firstEntry.main.humidity,
                    pressure: firstEntry.main.pressure,
                    wind_speed: firstEntry.wind.speed,
                    wind_deg: firstEntry.wind.deg,
                    weather_id: firstEntry.weather[0].id,
                    description: firstEntry.weather[0].description,
                    icon: firstEntry.weather[0].icon
                };

                await axios.post('http://localhost:8800/weather', payload);
            } catch (err) {
                setError("Something went wrong. Please try again later.");
                console.error("Error fetching or posting data:", err);
            }
        }
    };

    const fetchWeatherFromDB = async (event) => {
        if (event.key === 'Enter') {
            setDbError('');
            setDbResults([]);
            setShowDbResults(false);

            if (!dbCity.trim()) {
                setDbError("Please enter a city name to search the database.");
                return;
            }

            try {
                const res = await axios.get(`http://localhost:8800/weather?location=${dbCity}`);
                if (res.data.length === 0) {
                    setDbError("No weather data found in database for this city.");
                } else {
                    setDbResults(res.data);
                    setShowDbResults(true);
                }
            } catch (err) {
                setDbError("Error fetching data from the database.");
                console.error("Database fetch error:", err);
            }
        }
    };

    return (
        <div className='app'>
            <div className="search">
                <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={searchLocation}
                    placeholder='Enter Location'
                    type="text"
                />
                {error && <p className="error-message">{error}</p>}
            </div>

            <div className="db-search">
                <input
                    value={dbCity}
                    onChange={(e) => setDbCity(e.target.value)}
                    onKeyPress={fetchWeatherFromDB}
                    placeholder='Enter city to fetch weather from database'
                    type="text"
                />
                {dbError && <p className="error-message">{dbError}</p>}
            </div>

            {showDbResults && dbResults.length > 0 && (
                <div className="db-results">
                    <h2>Weather Data from Database</h2>
                    <table className="weather-table">
                        <thead>
                            <tr>
                                <th>Location</th>
                                <th>Temperature (°C)</th>
                                <th>Timestamp</th>
                                <th>Humidity</th>
                                <th>Pressure</th>
                                <th>Wind Speed</th>
                                <th>Wind Degree</th>
                                <th>Weather ID</th>
                                <th>Description</th>
                                <th>Icon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dbResults.map((entry) => (
                                <tr key={entry.id}>
                                    <td>{entry.location}</td>
                                    <td>{entry.temperature}</td>
                                    <td>{entry.dt_txt}</td>
                                    <td>{entry.humidity}</td>
                                    <td>{entry.pressure}</td>
                                    <td>{entry.wind_speed}</td>
                                    <td>{entry.wind_deg}</td>
                                    <td>{entry.weather_id}</td>
                                    <td>{entry.description}</td>
                                    <td><img src={`http://openweathermap.org/img/wn/${entry.icon}.png`} alt={entry.description} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {data.city && (
                <div className="container">
                    <div className='top'>
                        <div className="location">
                            <h1>{data.city.name}</h1>
                        </div>
                    </div>
                    <div className="forecast-grid">
                        {Object.entries(
                            data.list.reduce((acc, entry) => {
                                const date = entry.dt_txt.split(' ')[0];
                                if (!acc[date]) acc[date] = [];
                                acc[date].push(entry);
                                return acc;
                            }, {})
                        ).slice(0, 3).map(([date, forecasts], idx) => (
                            <div className="bottom" key={idx}>
                                <h2>{new Date(date).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</h2>
                                <div className="time-forecast-grid">
                                    {forecasts.map((entry, i) => (
                                        <div className="time-card" key={i}>
                                            <p>{new Date(entry.dt_txt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                                            <img
                                                src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}.png`}
                                                alt={entry.weather[0].description}
                                            />
                                            <p>{Math.round(entry.main.temp)}°C</p>
                                            <p className='descriptions'>{entry.weather[0].description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherExtract;
