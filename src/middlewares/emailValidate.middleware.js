import { connection } from "../database/database.js";

async function emailValidade (req, res, next) {

    const { email } = req.body;

    try {

        const isEmail = await connection.query(
            'SELECT email FROM users WHERE email = $1;', 
            [email]
        );

        if (isEmail.rows.length !== 0) {
            return res.sendStatus(409);
        };

        next();
        
    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
    }
};

export default emailValidade;