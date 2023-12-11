import React, { useState } from 'react';
import logo from './logo.png';
import qr from './qr.png';
import { useNavigate } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [productos, setProductos] = useState([]);
  const [showError, setShowError] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [carros, setCarros] = useState([
    { id: '123', nombre: 'Carro N°123', detalles: 'Detalles del Carro N°123' },
    { id: '456', nombre: 'Carro N°456', detalles: 'Detalles del Carro N°456' },
  ]);

  const [sugerencias, setSugerencias] = useState([]);

  const codigoProductoMap = carros.reduce(
    (acc, carro) => ({ ...acc, [carro.id]: carro.nombre }),
    {}
  );

  const handleIniciarClick = () => {
    if (inputValue) {
      navigate(`/PestanaCarro/`);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    setInputValue(inputValue);
    setProductos([]);
    setShowError(false);
    setIsButtonActive(inputValue.trim().length > 0);

    // Filtra carros según lo que el usuario está escribiendo
    const sugerenciasFiltradas = carros.filter((carro) =>
      carro.id.startsWith(inputValue)
    );
    setSugerencias(sugerenciasFiltradas);
  };

  const buscarProductos = () => {
    const productoEncontrado = codigoProductoMap[inputValue];

    if (productoEncontrado) {
      setProductos([...productos, productoEncontrado]);
    } else {
      setShowError(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      buscarProductos();
    }
  };

  const handleSugerenciaClick = (sugerencia) => {
    setInputValue(sugerencia.id);
    setSugerencias([]); // Limpiar las sugerencias al hacer clic
    buscarProductos();
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="barra-superior"></div>
        <img src={logo} className="LogoInicio" alt="logo" />
        <img src={qr} className="QRInicio" alt="QR" />
        <div className="RecuadroSuperior">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Código de carro"
            className="inputPersonalizado"
          />
          <button onClick={buscarProductos}>Buscar</button>

          {sugerencias.length > 0 && (
            <div className="sugerencias">
              <p>Sugerencias:</p>
              <ul>
                {sugerencias.map((sugerencia) => (
                  <li key={sugerencia.id} onClick={() => handleSugerenciaClick(sugerencia)}>
                    {sugerencia.nombre}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {showError && (
          <div className="MensajeRecuadro Error">
            <p>Código inválido o carro no encontrado</p>
          </div>
        )}
        <div className="RecuadroInferior">
          {productos.map((producto, index) => (
            <p className='txtResultado' key={index}>{producto}</p>
          ))}
        </div>
        <button
          className="BotonTransparente"
          onClick={handleIniciarClick}
          disabled={!isButtonActive}
        >
        </button>
        {carros.map((carro, index) => (
          <button
            key={index}
            className={`BotonCarro BotonCarro${index}`}
            onClick={handleIniciarClick}
            disabled={!isButtonActive}
          >
          </button>
        ))}
      </header>
    </div>
  );
}

export default Inicio;