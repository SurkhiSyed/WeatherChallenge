import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update() {
    const [weather, setWeather] = useState({
        timestamp: "",
        location: "",
        dt_txt: "",
        temperature: "",
        humidity: "",
        pressure: "",
        wind_speed: "",
        wind_deg: "",
        weather_id: "",
        description: "",
        icon: ""
    });

    const handleChange = (e) => {
        setWeather(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const navigate = useNavigate()
    const location = useLocation()

    const weatherID = location.pathname.split("/")[2]

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put("http://localhost:8800/weather/"+weatherID, weather)
            //const data = await res.json();
            navigate("/backend")
        } catch (err) {
            console.error("Error adding weather data:", err);
        }
    }

  return (
    <div className='form'>
        <h1>Update the Weather</h1>
        <input type="text" placeholder='Location' onChange={handleChange} name='location'/>
        <input
            type="datetime-local"
            placeholder='Timestamp'
            onChange={(e) => {
                const formatted = new Date(e.target.value).toISOString().slice(0, 19).replace("T", " ");
                setWeather(prev => ({ ...prev, dt_txt: formatted }));
            }}
            name='dt_txt'
            />
        <input type="number" placeholder='Temperature' onChange={handleChange} name='temperature'/>
        <input type="number" placeholder='Humidity' onChange={handleChange} name='humidity'/>
        <input type="number" placeholder='Pressure' onChange={handleChange} name='pressure'/>
        <input type="text" placeholder='Wind Speed' onChange={handleChange} name='wind_speed'/>
        <input type="text" placeholder='Wind Degree' onChange={handleChange} name='wind_deg'/>
        <input type="text" placeholder='Weather ID' onChange={handleChange} name='weather_id'/>
        <input type="text" placeholder='Description' onChange={handleChange} name='description'/>
        <input type="text" placeholder='Icon' onChange={handleChange} name='icon'/>
        <button onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update