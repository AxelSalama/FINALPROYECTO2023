import React from 'react';
import { useParams } from 'react-router-dom';
import './PestanaCarro.css';
import imgAdmChangoA from './adm_chango_a.png';

function PestanaCarro() {
  const { codigoCarro } = useParams();

  return (
    <div className="PestanaCarro">
      <p> 123 {codigoCarro}</p>
      <img src={imgAdmChangoA} alt="ADM CHANGO A" className="ImagenAdmChangoA" />
      
      <p1 className="Producto">Coca-Cola de 500ml $400 500112642896</p1>
    </div>
  );
}

export default PestanaCarro;

