const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://127.0.0.1:27017/biblioteca');

const LibroSchema = new mongoose.Schema({
  _id: Number,
  titulo: String,
  autor: String,
  }, { collection: 'libros' });

  const Libro = mongoose.model('Libro', LibroSchema);
  
  module.exports = Libro;