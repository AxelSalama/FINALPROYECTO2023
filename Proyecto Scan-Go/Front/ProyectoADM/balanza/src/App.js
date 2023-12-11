import React from 'react';
import './App.css';
import Bienvenida from './Bienvenida/Bienvenida';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './Inicio';
import PestanaCarro from './PestanaCarro';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Bienvenida />}></Route>
            <Route path="/inicio" element={<Inicio />}></Route>
            <Route path="/PestanaCarro" element={<PestanaCarro />}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
