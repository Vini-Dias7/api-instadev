/* eslint-disable linebreak-style */
const { Router } = require('express');
const UserModel = require('../src/apps/models/Users');
const schemaValidator = require('../src/apps/middlewares/schemaValidator');

const userSchema = require('../src/schema/create.user.schema.json')
const UserController = require('./apps/controllers/UserController');
const AuthenticationController = require('./apps/controllers/AuthenticationController');
const authSchema = require('../src/schema/auth.schema.json');

const routes = new Router();

routes.post('/user', schemaValidator(userSchema), UserController.create);

routes.post('/auth', schemaValidator(authSchema), AuthenticationController.authenticate);

routes.get('/health', (req, res) => res.send({
  message: 'Connected with success in port 3000',
}));

module.exports = routes;
