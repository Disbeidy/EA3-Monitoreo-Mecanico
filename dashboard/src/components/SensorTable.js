import React, { useEffect, useState } from 'react';
import { getSensores } from '../services/api';

const SensorTable = () => {
  const [sensores, setSensores] = useState([]);
  const [filtro, setFiltro] = useState('');

  // Se vuelve a cargar cuando el filtro cambia
  useEffect(() => {
    cargarSensores(filtro);
  }, [filtro]);

  const cargarSensores = async (tipo) => {
    try {
      const data = await getSensores(tipo);
      setSensores(data);
    } catch (error) {
      console.error('Error al cargar la tabla', error);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <label htmlFor="filtro-tipo" style={{ marginRight: '10px', fontWeight: 'bold' }}>
          Filtrar por tipo:
        </label>
        <select 
          id="filtro-tipo" 
          value={filtro} 
          onChange={(e) => setFiltro(e.target.value)}
          style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        >
          <option value="">Todos</option>
          <option value="temperatura">Temperatura</option>
          <option value="presion">Presión</option>
          <option value="vibracion">Vibración</option>
          <option value="velocidad">Velocidad</option>
          <option value="nivel">Nivel</option>
          <option value="flujo">Flujo</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ backgroundColor: '#2c3e50', color: 'white' }}>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>ID</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Nombre</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Tipo</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Valor</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Unidad</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Ubicación</th>
              <th style={{ padding: '12px', border: '1px solid #ddd' }}>Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
            {sensores.length > 0 ? (
              sensores.map((sensor) => (
                <tr key={sensor.id} style={{ borderBottom: '1px solid #ddd', textAlign: 'center' }}>
                  <td style={{ padding: '12px' }}>{sensor.id}</td>
                  <td style={{ padding: '12px' }}>{sensor.nombre}</td>
                  <td style={{ padding: '12px', textTransform: 'capitalize' }}>{sensor.tipo}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{sensor.valor}</td>
                  <td style={{ padding: '12px' }}>{sensor.unidad}</td>
                  <td style={{ padding: '12px' }}>{sensor.ubicacion}</td>
                  <td style={{ padding: '12px' }}>{new Date(sensor.fecha_registro).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                  No hay sensores registrados para este filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SensorTable;
