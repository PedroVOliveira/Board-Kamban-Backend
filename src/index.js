const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const bodyParser = require('body-parser');

// const jwt = require('jsonwebtoken');
// Ao ir para produção, adicionar o seguinte trecho
/*
    app.use(cors({
        origin:'http://endereco.com
    }))
*/
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(4010);

