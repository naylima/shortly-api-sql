import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { connection } from '../database/database.js';

const signUp = async (req, res) => {

    const { name, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);

    try {

        await connection.query( 
            `INSERT INTO users ("name", "email", "password") 
            VALUES ($1, $2, $3);`,
            [name, email, hashPassword]
        );

        res.sendStatus(201);
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
};

const signIn = async (req, res) => {

    const user = res.locals.user;
    const email = res.locals.email;
    const token = uuid();

    try {       

        await connection.query(
            `INSERT INTO sessions ("userId", "email", "token") 
            VALUES ($1, $2, $3);`,
            [user.id, email, token]                    
        );
        
        return res.status(200).send(token);

    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
}

export { signUp, signIn };