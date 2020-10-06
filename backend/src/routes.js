const express = require('express');

const pedidoController = require('./controller/pedidoController')
const incidentController = require('./controller/incidentController')
const profileController = require('./controller/profileController')
const sessionController = require('./controller/sessionController')
const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/pedidos', pedidoController.index);
routes.post('/pedidos', pedidoController.create);

routes.get('/profile', profileController.index);

routes.post('/incidents', incidentController.create);
routes.get('/incidents', incidentController.index);
routes.delete('/incidents/:id',incidentController.delete);

module.exports = routes;