const contacto = require('./../models/contacto');

module.exports = {
    listar: (req, res) => {

        contacto.find({status: 1, userId: req.user._id})
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send('algo salio mal'); // BAD REQUEST
            });
        
    },
    ver: (req, res) => {
        const id = req.params.id;
        contacto.findOne({status: 1, _id: id, userId: req.user._id })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(400).send('algo salio mal'); // BAD REQUEST
            });
    },
    crear: (req, res) => {
            let data = req.body;

            data.userId = req.user._id;

            console.log(req.file);

            data.photoUrl = req.file.filename;
            
            contacto.create(data).then(response => {
                res.send(response);
            }).catch(e => {
                res.sendStatus(400);
            });
    }
}

// find, findOne, findById, create, save

// SELECT * from contactos WHERE status = 1 AND _id = id LIMIT 1
