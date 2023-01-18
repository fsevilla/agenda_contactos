const { Schema, model } = require('mongoose');

// 1: Activo
// 2: Eliminado 

const contactoSchema = new Schema({
    nombre: { type: String },
    telefono: { type: String, default: '0' },
    correo: { type: String },
    status: { type: Number, default: 1 },
    userId: { type: String },
    photoUrl: { type: String }
});

module.exports = model('contactos', contactoSchema);
