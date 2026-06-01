import React, { useEffect, useState } from 'react';
import { getSensores } from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SensorChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSensores();
        
        // Agrupar la cantidad de sensores por su tipo
        const counts = data.reduce((acc, sensor) => {
          acc[sensor.tipo] = (acc[sensor.tipo] || 0) + 1;
          return acc;
        }, {});

        setChartData({
          labels: Object.keys(counts),
          datasets: [
            {
              label: 'Cantidad de Sensores',
              data: Object.values(counts),
              backgroundColor: 'rgba(54, 162, 235, 0.6)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error al cargar datos para el gráfico', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { 
        display: true, 
        text: 'Cantidad de Sensores por Tipo',
        font: { size: 18 }
      },
    },
  };

  return (
    <div style={{ width: '80%', margin: '0 auto', paddingBottom: '40px', paddingTop: '20px' }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default SensorChart;
