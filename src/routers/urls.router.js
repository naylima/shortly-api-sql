import express from 'express';
import hasToken from '../middlewares/authorization.middleware.js';
import * as urlsController from '../controllers/urls.controllers.js';

const router = express.Router();

router.post('/urls/shorten', hasToken, urlsController.postUrl);
router.get('/urls/:id', urlsController.listUrl);
router.get('/urls/open/:shortUrl', urlsController.listShortUrl);
router.delete('/urls/:id', hasToken, urlsController.deleteUrl);

export default router;