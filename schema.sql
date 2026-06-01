CREATE DATABASE IF NOT EXISTS monitoreo_mecanico;
USE monitoreo_mecanico;

CREATE TABLE IF NOT EXISTS sensores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  tipo ENUM('temperatura', 'presion', 'vibracion', 'velocidad', 'nivel', 'flujo') NOT NULL,
  valor DECIMAL(10, 2) NOT NULL,
  unidad VARCHAR(50) NOT NULL,
  ubicacion VARCHAR(255) NOT NULL,
  fecha_registro DATETIME NOT NULL
);
