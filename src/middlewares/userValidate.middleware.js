import bcrypt from 'bcrypt';
import { connection } from '../database/database.js';

async function userValidade (req, res, next) {
    
    const {email, password} = req.body;

    try {

        const user = await connection.query(
            'SELECT * FROM users WHERE email = $1;', 
            [email]
        );

        res.locals.user = user.rows[0];

        if (user && bcrypt.compareSync(password, user.rows[0].password)) {
            next();
        }

        else {
            return res.sendStatus(401);
        }
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }

};

export default userValidade;