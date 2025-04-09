import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "weather",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.use(express.json());
app.use(cors());

// GET route to fetch weather data from the database
app.get("/weather", (req, res) => {
    const q = "SELECT * FROM weather_data";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

// POST route to insert weather data into the database
app.post("/weather", (req, res) => {
    console.log("Received body:", req.body); // 👈 Add this line

    const q = `INSERT INTO weather_data 
        (timestamp, location, dt_txt, temperature, humidity, pressure, wind_speed, wind_deg, weather_id, description, icon) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const {
        timestamp,
        location,
        dt_txt,
        temperature,
        humidity,
        pressure,
        wind_speed,
        wind_deg,
        weather_id,
        description,
        icon
    } = req.body;

    const values = [
        timestamp,
        location,
        dt_txt,
        temperature,
        humidity,
        pressure,
        wind_speed,
        wind_deg,
        weather_id,
        description,
        icon
    ];

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json({ error: "Failed to insert weather data" });
        }
        return res.json({ message: "Data updated successfully", data });
    });
});

app.put("/weather/:id", (req, res) => {
    const weatherId = req.params.id;
    const q = `UPDATE weather_data SET
        (timestamp, location, dt_txt, temperature, humidity, pressure, wind_speed, wind_deg, weather_id, description, icon, id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const {
            timestamp,
            location,
            dt_txt,
            temperature,
            humidity,
            pressure,
            wind_speed,
            wind_deg,
            weather_id,
            description,
            icon
        } = req.body;
    
        const values = [
            timestamp,
            location,
            dt_txt,
            temperature,
            humidity,
            pressure,
            wind_speed,
            wind_deg,
            weather_id,
            description,
            icon
        ]; 

    db.query(q, [...values,weatherId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Weather data has been deleted successfully.");
    });
});

app.delete("/weather/:id", (req, res) => {
    const weatherId = req.params.id;
    const q = "DELETE FROM weather_data WHERE id = ?";

    db.query(q, [weatherId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Weather data has been deleted successfully.");
    });
});


app.listen(8800, () => {
    console.log("Server is running on port 8800!");
});
