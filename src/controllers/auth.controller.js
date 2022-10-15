import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import * as authRepository from '../repositories/auth.repository.js';

const signUp = async (req, res) => {

    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);

    try {

        await authRepository.insertUser(name, email, hashPassword);
        res.sendStatus(201);
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
};

const signIn = async (req, res) => {

    const user = res.locals.user;
    const token = uuid();

    try {

        await authRepository.insertSession(user, token);        
        res.status(200).send({"token": token});

    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
};

export { signUp, signIn };