import React from 'react';
import './App.css';
import Bienvenida from './Bienvenida/Bienvenida';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ModoOscuro from './ModoOscuro/ModoOsucro';
import Inicio from './Inicio';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Bienvenida />}></Route>
            <Route path="/inicio" element={<Inicio />}></Route>
            <Route path="/ModoOscuro" element={<ModoOscuro />}></Route>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
