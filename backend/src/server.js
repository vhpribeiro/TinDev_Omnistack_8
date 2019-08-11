const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./route');

const server = express();

mongoose.connect('mongodb+srv://vitor:170619968v@clusterinicial-mlysw.azure.mongodb.net/omnistack8?retryWrites=true&w=majority', {
    useNewUrlParser: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3333);