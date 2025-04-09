import logo from './logo.svg';
import WeatherPage from './pages/WeatherPage';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Crud from './pages/Crud';
import Add from './components/Add';
import Update from './components/Update';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherPage/>} />
        <Route path="/backend" element={<Crud/>} />
        <Route path="/add" element={<Add/>} />
        <Route path="/update/:id" element={<Update/>} />
      </Routes>
    </Router>
  );
}

export default App;
