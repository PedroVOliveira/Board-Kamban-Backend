const { Router } = require('express');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const boardController = require('./controllers/boardController');
const stepController = require('./controllers/stepController');
const taskController = require('./controllers/taskController');
const { verifyJWT } = require('./utils/verifyJWT');
require('dotenv').config()
const routes = Router();

routes.get('/users',userController.index);
routes.post('/users',userController.create);
routes.get('/board',verifyJWT,boardController.index);
routes.get('/step',verifyJWT,stepController.index);
routes.post('/step',verifyJWT,stepController.create);
routes.get('/task',verifyJWT,taskController.index);
routes.post('/task',verifyJWT,taskController.create);
routes.post('/auth',authController.auth);


module.exports = routes;