import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';

import authRouter from './routers/auth.router.js';
import urlsRouter from './routers/urls.router.js';
import usersRouter from './routers/users.router.js';

dotenv.config();

const server = express();

server.use(cors());
server.use(express.json());

server.use(authRouter);
server.use(urlsRouter);
server.use(usersRouter);

server.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});