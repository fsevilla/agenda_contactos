const express = require('express');
const mongoose = require('mongoose');
const contacto = require('./src/models/contacto');

require('dotenv').config();

const apiRoutes = require('./src/routes/api');

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(apiRoutes);

app.use('/fotos', express.static(__dirname + '/uploads/images'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('', (req, res) => {
    res.sendFile(__dirname + '/src/views/index.html');
});


const uri = process.env.MONGODB;
console.log(uri);

mongoose.set("strictQuery", false);

mongoose.connect(uri, (err) => {
    if(err) {
        console.log('No se pudo conectar a la base de datos', err);
    } else {
        console.log('Se conecto correctamente a la base de datos');
        app.listen(port, () => {
            const env = process.env.NODE_ENV;
            if (env === 'local') {
                console.log('app is running in LOCAL in port ' + port);
            } else {
                console.log('app is running in PROD in port ' + port);
            }
        });
    }
});



