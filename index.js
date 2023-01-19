const express = require('express');
const mongoose = require('mongoose');
const contacto = require('./src/models/contacto');

const { engine } = require('express-handlebars');

require('dotenv').config();

const apiRoutes = require('./src/routes/api');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/src/views');

const port = process.env.PORT || 3000;

app.use(express.json());

app.use(apiRoutes);

app.use('/fotos', express.static(__dirname + '/uploads/images'));
app.use('/assets', express.static(__dirname + '/assets'));

app.get('', (req, res) => {
    // res.sendFile(__dirname + '/src/views/index.html');
    res.render('index');
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



