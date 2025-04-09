import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './crud.css';

function Crud() {
    const [weather, setWeather] = useState([]);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const res = await axios.get('http://localhost:8800/weather');
                setWeather(res.data);
            } catch (err) {
                console.error("Error fetching data from the backend:", err);
            }
        };
        fetchWeather();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8800/weather/${id}`);
            setWeather(prev => prev.filter(entry => entry.id !== id));
        } catch (err) {
            console.error("Error deleting data:", err);
        }
    }

    return (
        <div className='app'>
            <h1>Weather Data</h1>
            <div className='weather'>
                {weather.length > 0 ? (
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {weather.map(entry => (
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
                                    <td>{entry.icon}</td>
                                    {/* Add the icon URL to display the weather icon */}
                                    <td>
                                        <button className='update'>
                                            <Link to={`/update/${entry.id}`}>Update</Link>
                                        </button>
                                        <button className='delete' onClick={() => handleDelete(entry.id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
            <button className='add-new'>
                <Link to='/add'>Add New Weather</Link>
            </button>
        </div>
    );
}

export default Crud;
