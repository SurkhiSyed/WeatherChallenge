# 🌤️ Weather Dashboard App

A full-stack weather dashboard built with React.js (frontend), Node.js + Express (backend), and MySQL (database). Users can search for weather data by location and date range, and all fetched data is stored in the database with full CRUD operations and export functionality.

---

## 🚀 Features

- 🔍 Search current weather by city and date range using OpenWeatherMap API.
- 💾 Automatically store searched weather data in a MySQL database.
- 🧾 View, update, delete, or export weather history records.
- 📊 Clean UI built with React and Tailwind CSS.
- 🔐 Environment variables used to secure API keys and database credentials.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **API:** OpenWeatherMap API
- **Other:** Axios, dotenv, cors

---

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/weather-app.git
cd weather-app
```

### Setup Frontend
```
cd client
npm install
npm start
```

### Setup Backend
```
cd client
npm install
npm start
```

## .env configuration
```
REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=weather_app_db
```
