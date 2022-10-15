import express from 'express';
import hasToken from '../middlewares/authorization.middleware.js';
import * as usersController from '../controllers/users.controller.js';

const router = express.Router();

router.get('/users/me', hasToken, usersController.listUser);
router.get('/ranking', usersController.listRanking);

export default router;