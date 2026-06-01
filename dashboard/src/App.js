import React from 'react';
import SensorChart from './components/SensorChart';
import SensorTable from './components/SensorTable';

function App() {
  return (
    <div className="container">
      <h1>Panel de Monitoreo Mecánico</h1>
      <p style={{ textAlign: 'center', marginBottom: '30px', color: '#666' }}>
        Dashboard en tiempo real consumiendo la API de Sensores (React + Chart.js)
      </p>
      
      {/* Gráfico arriba */}
      <SensorChart />
      
      <hr style={{ margin: '40px 0', border: '0', borderTop: '2px dashed #ccc' }} />
      
      {/* Tabla abajo */}
      <SensorTable />
    </div>
  );
}

export default App;
