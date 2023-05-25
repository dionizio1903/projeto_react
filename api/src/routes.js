const express = require('express');

const Pcontroller = require('./controllers/Pcontroller')
const Ccontroller = require('./controllers/Ccontroller')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const routes = express.Router();

/*rota de login*/

routes.post('/session', SessionController.create); 

/*rota de pesoas*/

routes.get('/pessoas', Pcontroller.index);
routes.post('/pessoas', Pcontroller.create); 
 
/*rota de casos*/

routes.get('/casos', Ccontroller.index);
routes.post('/casos', Ccontroller.create);
routes.delete('/casos/:id', Ccontroller.delete);

/*rota de profile*/

routes.get('/Profile', ProfileController.index);

module.exports = routes;


