import React from 'react';
import { useNavigate } from 'react-router-dom';
import PantallaBienvenida from './PantallaBienvenidaa.png';
import './Bienvenida.css';

function Bienvenida() {
  const navigate = useNavigate();

  const handleIniciarClick = () => {
    navigate('/inicio');
  };

  return (
    <div className="App">
      <div className="ContenedorBienvenida">
        {<img src={PantallaBienvenida} alt="Pantalla de Bienvenida" className="ImagenBienvenida" />}
        <button className="BtnBienvenida" onClick={handleIniciarClick}> 
        </button>
      </div>
    </div>
  );
}

export default Bienvenida;
