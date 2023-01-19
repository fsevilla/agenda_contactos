// GET /contactos
const express = require('express');
const router = express.Router();
const multer = require('multer');

const authMiddleware = require('../middlewares/auth');
const contactosController = require('./../controllers/contactos');
const usuariosController = require('./../controllers/usuarios');

const storage = {
    destination: (req, file, callback) => {
        callback(null, 'uploads/images'); // error-first callback
    },
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop(); // nombre.masnombre.extension ? 
        // let nombre = req.user._id + '-' + new Date().getTime() + '.' + extension;
        const nombre = `${req.user._id}-${new Date().getTime()}.${extension}`;
        callback(null, nombre);
    }
};

function filter(req, file, callback) {
    const isValid = file.mimetype == 'image/jpeg';
    callback(null, isValid);
}

const multerStorage = multer.diskStorage(storage);

const upload = multer({ storage: multerStorage, fileFilter:  filter });

// CONTACTOS
router.use('/api', authMiddleware);
router.get('/api/contactos', contactosController.listar);
router.get('/api/contactos/:id', contactosController.ver);
router.post('/api/contactos', express.json(), upload.single('foto'), contactosController.crear);


// USUARIOS
router.post('/registro', usuariosController.registro);
router.post('/login', usuariosController.login);
router.get('/registro', usuariosController.formRegistro);

module.exports = router;


// usuario - ui - (route, controller - model) - bdd