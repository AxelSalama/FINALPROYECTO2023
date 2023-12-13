import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.png';
import qr from './qr.png';
import './Inicio.css'; // Asegúrate de tener el archivo CSS correspondiente

function Inicio() {
  const [inputValue, setInputValue] = useState('');
  const [productos, setProductos] = useState([]);
  const [showError, setShowError] = useState(false);
  const [carroNumero, setCarroNumero] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProductos() {
      try {
        const response = await fetch(`http://localhost:9000/api/carritos/${carroNumero}`);
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
          setShowError(false);
        } else {
          setShowError(true);
          setProductos([]);
        }
      } catch (error) {
        console.error('Error al obtener los productos', error);
        setShowError(true);
        setProductos([]);
      }
    }

    if (carroNumero !== '') {
      fetchProductos();
    }
  }, [carroNumero]);

  const handleIniciarClick = () => {
    navigate('/');
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value.replace(/\D/g, '');
    setInputValue(inputValue);
    setCarroNumero('');
    setProductos([]);
    setShowError(false);
  };

  const buscarProductos = () => {
    setCarroNumero(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      buscarProductos();
    }
  };

  const agregarProducto = (index) => {
    const productoAgregado = productos[index];
    setProductos([...productos, productoAgregado]);
  };

  const handleBorrarProducto = (index) => {
    const nuevosProductos = [...productos];
    nuevosProductos.splice(index, 1);
    setProductos(nuevosProductos);
  };

  const calcularPrecioFinal = () => {
    const precioFinal = productos.reduce((total, producto) => {
      const match = /\$([\d,]+)/.exec(producto.nombre);
      const precio = match ? parseFloat(match[1].replace(',', '')) : 0;
      return total + precio;
    }, 0);

    return precioFinal.toFixed(2);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="barra-superior"></div>
        <button className="BotonBienvenida" onClick={handleIniciarClick}></button>
        <img src={logo} className="LogoInicio" alt="logo" />
        <img src={qr} className="QRInicio" alt="QR" />
        <div className="TxtInicio">
          <h1>Carro N° {carroNumero}</h1>
        </div>
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
        </div>
        {showError && (
          <div className="MensajeRecuadro Error">
            <p>Código inválido o carro no encontrado</p>
          </div>
        )}
        <div className="RecuadroInferior">
          {productos.map((producto, index) => (
            <div key={index} className="productoContainer">
              <div className="productoInfo">
                <p className="txtResultado">{producto.nombre}</p>
                <div className="textoA"></div>
              </div>
              {producto.mostrarBotones && (
                <div className="botonesContainer">
                  <button
                    className="botonVerde"
                    onClick={() => agregarProducto(index)}
                  ></button>
                  <button
                    className="botonRojo"
                    onClick={() => handleBorrarProducto(index)}
                  ></button>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Nuevo recuadro para el Precio Final */}
        <div className="RecuadroPrecioFinal">
          <p>Precio Final: ${calcularPrecioFinal()}</p>
        </div>
      </header>
    </div>
  );
}

export default Inicio;
