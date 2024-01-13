const express = require("express");
const router = express.Router();

const Libro = require("../models/Libro");

// Importamos la librería para validar scopes
const { requiredScopes } = require("express-oauth2-jwt-bearer");

// Ruta para obtener todos los libros
router.get("/", requiredScopes("read:productos"), async (req, res) => {
try {
const libros = await Libro.find();
const respuestaFormateada = libros.map(item => ({
        _id: item._id,
        titulo: item.titulo,
        autor: item.autor,
      }));
res.json(respuestaFormateada);
} catch (error) {
res.status(500).json({ error: "Error al obtener los libros" });
}
});

// Ruta para crear un nuevo Libro
router.post("/",  requiredScopes("write:libros"), async (req, res) => {
try {
const nuevoLibro = new Libro(req.body);
await nuevoLibro.save();
res.json(nuevoLibro);
} catch (error) {
res.status(500).json({ error: "Error al crear el Libro" });
}
});

// Ruta para actualizar un Libro existente
router.put("/:_id",  requiredScopes("write:libros"), async (req, res) => {
        try {
            const Libro = await Libro.findByIdAndUpdate(req.params._id, req.body,
            {
            new: true,
            });
            res.json(Libro);
            } catch (error) {
            res.status(500).json({ error: "Error al actualizar el Libro" });
            }
    });

// Ruta para eliminar un Libro
router.delete('/:_id',  requiredScopes("write:libros"), async (req, res) => {
        try {
        await Libro.findByIdAndDelete(req.params._id);
        res.json({ message: 'Libro eliminado correctamente' });
        } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Libro' });
        }
});

 module.exports = router;