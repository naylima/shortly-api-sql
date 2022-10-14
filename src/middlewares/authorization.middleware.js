import { connection } from "../database/database.js";

async function hasToken (req, res, next) {

    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    
    if(!token) return res.sendStatus(401);

    try {

        const session = await connection.query(
            `SELECT * FROM sessions WHERE token = $1;`,
            [token]
        );
        
        if (session.rows.length === 0) {
            return res.sendStatus(401);
        };

        const user = await connection.query(
            `SELECT id, name, email FROM users WHERE id = $1;`,
            [session.rows[0].userId]
        )

        res.locals.token = token;
        res.locals.user = user.rows[0];

        next(); 

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);        
    }
};

export default hasToken;