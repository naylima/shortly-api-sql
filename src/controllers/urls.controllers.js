import { nanoid } from 'nanoid';
import { connection } from '../database/database.js';

const postUrl = async (req, res) => {

    const { url } = req.body;
    const shortUrl = nanoid(8);
    res.locals.user = user;

    if (new URL(url) === false) return res.sendStatus(422);

    try {

        await connection.query(
            `INSERT INTO urls ("userId", "url", "shortUrl")
            VALUES ($1, $2, $3);`,
            [user.id, url, shortUrl ]
        );

        res.status(201).send(shortUrl);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);   
    }

};

const listUrl = async (req, res) => {
    
    const id = req.params;

    try {
        
        const url = await connection.query(
            `SELECT id, url, shortUrl FROM urls WHERE id = $1;`,
            [id]
        );

        if (url.rows.length === 0) {
            return res.sendStatus(404);
        };

        res.sendStatus(200);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);   
    }
};

const listShortUrl = async (req, res) => {

    const shortUrl = req.params;

    try {

        const url = await connection.query(
            `SELECT * FROM urls WHERE shortUrl = $1;`,
            [shortUrl]
        );

        if (url.rows.length === 0) {
            return res.sendStatus(404);
        };
        
        const link = url.rows[0].url;
        res.redirect(link);

        await connection.query(
            `INSERT INTO access ("creatorId", "urlId") VALUES ($1, $2);`,
            [url.rows[0].userId , url.rows[0].id]
        );

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500); 
    }

};

const deleteUrl = async (req, res) => {

    const { id } = req.params;
    res.locals.user = user;

    try {

        const isUrl = await connection.query(
            `SELECT * FROM urls WHERE id = $1;`,
            [id]
        );

        if (isUrl.rows.length === 0) {
            return res.status(404);
        };

        const userHasUrl = await connection.query(
            `SELECT * FROM urls WHERE id = $1 and userId = $2;`,
            [id, user.id]
        );

        if (userHasUrl .rows.length === 0) {
            return res.status(401);
        };

        await connection.query(
            `DELETE * FROM urls WHERE id = $1;`,
            [id]
        );

        res.sendStatus(204);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500); 
    }
};

export { postUrl, listUrl, listShortUrl, deleteUrl };