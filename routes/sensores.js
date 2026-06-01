const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/sensores -> Listar todos, filtro opcional ?tipo=temperatura
router.get('/', async (req, res) => {
  try {
    const { tipo } = req.query;
    let query = 'SELECT * FROM sensores';
    let params = [];

    if (tipo) {
      query += ' WHERE tipo = ?';
      params.push(tipo);
    }

    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (error) {
    console.error('Error al obtener sensores:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// POST /api/sensores -> Insertar un nuevo sensor
router.post('/', async (req, res) => {
  try {
    const { nombre, tipo, valor, unidad, ubicacion, fecha_registro } = req.body;
    
    // Validación básica
    if (!nombre || !tipo || !fecha_registro) {
      return res.status(400).json({ error: 'Faltan campos obligatorios (nombre, tipo, fecha_registro)' });
    }

    const query = 'INSERT INTO sensores (nombre, tipo, valor, unidad, ubicacion, fecha_registro) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await pool.query(query, [nombre, tipo, valor || null, unidad || null, ubicacion || null, fecha_registro]);

    res.status(201).json({ 
      message: 'Sensor creado correctamente', 
      id: result.insertId 
    });
  } catch (error) {
    console.error('Error al insertar sensor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// PUT /api/sensores/:id -> Actualizar un sensor por id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, tipo, valor, unidad, ubicacion, fecha_registro } = req.body;

    const query = 'UPDATE sensores SET nombre = ?, tipo = ?, valor = ?, unidad = ?, ubicacion = ?, fecha_registro = ? WHERE id = ?';
    const [result] = await pool.query(query, [nombre, tipo, valor || null, unidad || null, ubicacion || null, fecha_registro, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Sensor no encontrado' });
    }

    res.json({ message: 'Sensor actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar sensor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// DELETE /api/sensores/:id -> Eliminar un sensor por id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const query = 'DELETE FROM sensores WHERE id = ?';
    const [result] = await pool.query(query, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Sensor no encontrado' });
    }

    res.json({ message: 'Sensor eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar sensor:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

module.exports = router;
