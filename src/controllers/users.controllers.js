import { connection } from '../database/database.js';

const listUser = async (req, res) => {

    const user = res.locals.user;

    try {

        const isUser = await connection.query(
            `
                SELECT 
                    userVisits.id,
                    userVisits.name,
                    userVisits."visitCount",
                    JSON_AGG (
                        JSON_BUILD_OBJECT(
                            'id', linkVisits.id,
                            'shortUrl', linkVisits."shortUrl",
                            'url', linkVisits.url,
                            'visitCount', linkVisits."visitCount"
                        )
                    )
                    AS "shortenedUrls"
                FROM (
                    SELECT 
                        users.id, 
                        users.name, 
                        COUNT (access."creatorId") AS "visitCount"
                    FROM users
                    JOIN access
                    ON users.id = access."creatorId"
                    GROUP BY users.id
                )
                AS userVisits
                JOIN (
                    SELECT 
                        urls.id, 
                        urls."userId", 
                        urls."shortUrl", 
                        urls.url, 
                        COUNT (access."urlId") AS "visitCount"
                    FROM urls
                    JOIN access
                    ON urls.id = access."urlId"
                    GROUP BY urls.id
                )
                AS linkVisits
                ON (userVisits.id = linkVisits."userId")
                WHERE userVisits."id"= $1
                GROUP BY userVisits.id, userVisits.name,  userVisits."visitCount";
            `,
            [user.id]
        );
        
        if (isUser.rows.length === 0) {
            return res.sendStatus(404);
        };
        
        res.status(200).send(isUser.rows[0]);

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
                    links.id,
                    links.name,
                    links."linksCount",
                    visits."visitCount"
                FROM (
                    SELECT users.id, users.name, COUNT (urls."userId") AS "linksCount"
                    FROM users 
                    LEFT JOIN urls
                    ON users.id = urls."userId"
                    GROUP BY users.id
                ) 
                AS links
                JOIN (
                    SELECT users.id, users.name, COUNT (access."creatorId") AS "visitCount"
                    FROM users 
                    LEFT JOIN access
                    ON users.id = access."creatorId"
                    GROUP BY users.id
                )
                AS visits
                ON (links.id = visits.id)
                ORDER BY visits."visitCount"
                LIMIT 10;
            `
        );

        res.status(200).send(ranking.rows);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500); 
    }
}

export { listUser, listRanking };