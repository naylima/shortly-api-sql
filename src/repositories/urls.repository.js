import { connection } from '../database/database.js';

const TABLE = "urls";

async function insertUrl (user, url, shortUrl) {

    return await connection.query(
        `INSERT INTO ${TABLE} ("userId", "url", "shortUrl")
        VALUES ($1, $2, $3);`,
        [user.id, url, shortUrl ]
    );
};

async function getUrlbyId (id) {

    const url = await connection.query(
        `SELECT id, url, "shortUrl" FROM ${TABLE} WHERE id = $1;`,
        [id]
    );

    return url;
};

async function getUrlbyShortUrl (shortUrl) {

    return await connection.query(
        `SELECT * FROM ${TABLE} WHERE "shortUrl" = $1;`,
        [shortUrl]
    );
};

async function getUrlbyIdAndUserId (id, user) {

    return await connection.query(
        `SELECT * FROM ${TABLE} WHERE id = $1 AND "userId" = $2;`,
        [id, user.id]
    );
};

async function deleteUrlbyId (id) {

    return await connection.query(
        `DELETE FROM urls WHERE id = $1;`,
        [id]
    );
};

async function insertAccess (url) {

    return await connection.query(
        `INSERT INTO access ("creatorId", "urlId") VALUES ($1, $2);`,
        [url.rows[0].userId , url.rows[0].id]
    );
};

export { 
    insertUrl, 
    getUrlbyId, 
    getUrlbyShortUrl,  
    getUrlbyIdAndUserId, 
    deleteUrlbyId,
    insertAccess 
};