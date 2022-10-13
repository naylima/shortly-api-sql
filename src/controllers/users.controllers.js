import { connection } from '../database/database.js';

const listUser = async (req, res) => {

    res.locals.user = user;

    try {

        const isUser = await connection.query(
            `
                SELECT 
                    users.id,
                    users."name",
                    COUNT (access.userId) AS "visitCount"
                    JSON_BUILD_OBJECT(
                        "id", urls.id,
                        "shortUrl", urls."shortURL",
                        "url", urls."url",
                        "visitCount", COUNT (access.urlId)
                    )
                    AS shortenedUrls,
                FROM users
                JOIN urls
                ON users.id = urls."userId"
                JOIN access
                ON users.id = access."userId"
                GROUP BY users.id
                WHERE users.id = $1;
            `,
            [user.id]
        );
        
        if (isUser.rows.length === 0) {
            return res.sendStatus(404);
        };
        
        res.sendStatus(200);

    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500); 
    }
};

const listRanking = async (req, res) => {

    try {

        const ranking =await connection.query(
            `
                SELECT
                    users.id,
                    users.name,
                    COUNT (urls.userId) AS "linksCount",
                    COUNT (access.userId) AS "visitCount"
                FROM users
                JOIN urls
                ON users.id = urls."userId"
                JOIN access
                ON users.id = access."userId"
                GROUP BY users.id
                ORDER BY "visitCount"
                LIMIT 10;
            `
        );

        res.status(200).send(ranking);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500); 
    }
}

export { listUser, listRanking };