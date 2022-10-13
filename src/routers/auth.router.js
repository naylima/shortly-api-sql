import express from 'express';
import emailValidade from '../middlewares/emailValidate.middleware.js';
import userValidade from '../middlewares/userValidate.middleware.js';
import * as schemaMeddleware from '../middlewares/schemaValidate.middleware.js';
import * as authController from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', schemaMeddleware.schemaValidate, emailValidade, authController.signUp);
router.post('/signin', schemaMeddleware.loginSchemaValidate ,userValidade, authController.signIn);

export default router;