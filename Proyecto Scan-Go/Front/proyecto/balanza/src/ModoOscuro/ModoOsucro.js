import React from 'react';
import { useNavigate } from 'react-router-dom';
import PantallaOscura from './ModoOscuro.png';
import './ModoOscuro.css';

function ModoOscuro() {
  const navigate = useNavigate();

  const handleIniciarClick = () => {
    navigate('/Inicio');
  };
  const handleIniciarClick2 = () => {
    navigate('/');
  };

  return (
    <div className="App">
      <div className="ContenedorBienvenida2">
        {<img src={PantallaOscura} alt="Pantalla Oscura" className="ImagenBienvenida2" />}
        <button className="BtnBienvenida2" onClick={handleIniciarClick}> 
        </button>
        <button className="BtnOscuro" onClick={handleIniciarClick2}> 
        </button>
            </div>
    </div>
  );
}

export default ModoOscuro;
