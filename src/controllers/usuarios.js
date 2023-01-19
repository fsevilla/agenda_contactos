const jwt = require('jsonwebtoken');
const modelo = require('./../models/usuario');
require('dotenv').config();
const crypto = require('crypto');

function hashPassword(pwd) {
    return crypto.scryptSync(pwd, 'salt', 24);
}

module.exports = {
    login: (req, res) => {
        const data = req.body;

        const credenciales = {
            correo: data.correo,
            password: hashPassword(data.password)
        }
        
        modelo.findOne(credenciales).then(response => {
            if(response) {
                const {_id, nombre, correo } = response;
                const token = jwt.sign({_id, nombre, correo}, process.env.SECRET);
                res.send({token, nombre, correo});
            } else {
                res.sendStatus(401);
            }
        }).catch(err => {
            res.sendStatus(400);
        });
    },
    registro: (req, res) => {
        const datos = req.body;
        console.log('Datos: ', req.body);
        if(!datos.password || !datos.nombre || !datos.correo) {
            res.status(400).send({mensaje: 'este fue el error'});
            return;
        }

        const hashedPassword = hashPassword(datos.password);
        datos.password = hashedPassword; //
        modelo.create(datos).then(response => {
            const {_id, nombre, correo} = response;
            // res.send({_id, nombre, correo});
            res.render('confirmacion', { nombre, correo });

        }).catch(err => {
            console.log(err);
            // res.sendStatus(400);
            res.render('confirmacion', { error: true, correo: datos.correo });
        });
    },
    formRegistro: (req, res) => {
        res.render('registro');
    }
}

// find, findOne, findById, create, save

// SELECT * from contactos WHERE status = 1 AND _id = id LIMIT 1