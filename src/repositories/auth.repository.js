import { connection } from '../database/database.js';

async function insertUser (name, email, hashPassword) {

    return await connection.query( 
        `INSERT INTO users ("name", "email", "password") 
        VALUES ($1, $2, $3);`,
        [name, email, hashPassword]
    );
};

async function insertSession (user, token) {

    return await connection.query(
        `INSERT INTO sessions ("userId", "token") 
        VALUES ($1, $2);`,
        [user.id, token]                    
    );
};

export { insertUser, insertSession };
