# Proyecto EA3: Sistema de Monitoreo Mecánico

Este proyecto consta de dos partes:
1. **Backend (API REST)**: Construido con Node.js, Express y MySQL (mediante `mysql2/promise`).
2. **Frontend (Dashboard)**: Construido con React, Axios y Chart.js para consumo y visualización de la información.

## Requisitos Previos

- **Node.js** (v14 o superior)
- **Base de Datos MySQL** (e.g. XAMPP, Navicat)

---

## 1. Configuración de la Base de Datos

1. Abre tu gestor de base de datos MySQL (por ejemplo, Navicat).
2. Asegúrate de tener una base de datos llamada `monitoreo_mecanico`.
3. Crea la tabla `sensores` con la siguiente estructura y tipos de datos:
   - `id` (INT, Auto Incremental, Primary Key)
   - `nombre` (VARCHAR)
   - `tipo` (ENUM o VARCHAR) -> 'temperatura', 'presion', 'vibracion'.
   - `valor` (FLOAT/DECIMAL)
   - `unidad` (VARCHAR)
   - `ubicacion` (VARCHAR)
   - `fecha_registro` (DATETIME)

---

## 2. Instalación y Uso del Backend (API)

Ubicación: Carpeta raíz del proyecto.

### Pasos de Instalación:
1. Abre una terminal en la carpeta principal.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno. Abre el archivo `.env.example`, copia su estructura en un nuevo archivo llamado `.env` y coloca tus credenciales reales (host, usuario, contraseña y base de datos).

   **Ejemplo del `.env`**:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=tu_contraseña_aqui
   DB_NAME=monitoreo_mecanico
   PORT=3000
   ```
4. Levanta el servidor:
   ```bash
   npm start
   ```
   *El servidor correrá en `http://localhost:3000`.*

### Endpoints Disponibles:

- **Listar todos los sensores (GET)**
  `GET http://localhost:3000/api/sensores`
  *Filtro opcional: `?tipo=temperatura`*

- **Insertar un nuevo sensor (POST)**
  `POST http://localhost:3000/api/sensores`
  ```json
  {
    "nombre": "Tacómetro Eje Central",
    "tipo": "velocidad",
    "valor": 1850.0,
    "unidad": "RPM",
    "ubicacion": "Caja de Engranajes Principal",
    "fecha_registro": "2026-05-31 21:15:30"
  }
  ```

- **Actualizar un sensor (PUT)**
  `PUT http://localhost:3000/api/sensores/:id`
  *Mismo cuerpo JSON que el método POST.*

- **Eliminar un sensor (DELETE)**
  `DELETE http://localhost:3000/api/sensores/:id`

---

## 3. Instalación y Uso del Frontend (Dashboard)

Ubicación: Carpeta `/dashboard`.

### Pasos de Instalación:
1. Abre una terminal dentro de la carpeta `dashboard`.
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación React (asegúrate de tener el Backend corriendo al mismo tiempo):
   ```bash
   npm start
   ```
   *El panel de monitoreo se abrirá automáticamente en tu navegador, usualmente en `http://localhost:3001`.*

### Características del Dashboard:
- Gráfico de barras interactivo agrupando la cantidad de sensores por su "tipo".
- Tabla dinámica que lista los registros directamente de la base de datos MySQL.
- Opción de Filtrado dinámico a través de peticiones HTTP en tiempo real al backend.

---
**Integrantes:**

Disbeidy Anzueta Gongora 
Daniela Anzueta Gongora
