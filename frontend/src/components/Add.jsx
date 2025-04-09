import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./add.css";

function Add() {
    const [weather, setWeather] = useState({
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

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8800/weather", weather)
            //const data = await res.json();
            navigate("/backend")
        } catch (err) {
            console.error("Error adding weather data:", err);
        }
    }

  return (
    <div className='form'>
        <h2>Add new Weather</h2>
        <input type="text" placeholder='Location' onChange={handleChange} name='location'/>
        <input
            type="datetime-local"
            placeholder='Timestamp'
            onChange={(e) => {
                const date = new Date(e.target.value);
                const formatted = date.toISOString().slice(0, 19).replace("T", " ");
                const timestamp = Math.floor(date.getTime() / 1000); // ← Get UNIX timestamp
                setWeather(prev => ({ ...prev, dt_txt: formatted, timestamp }));
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
        <button className='formButton' onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add