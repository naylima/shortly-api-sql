import { connection } from '../database/database.js';

async function listUser (user) {

    return await connection.query(
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
                LEFT JOIN access
                ON users.id = access."creatorId"
                GROUP BY users.id
            )
            AS userVisits
            LEFT JOIN (
                SELECT 
                    urls.id, 
                    urls."userId", 
                    urls."shortUrl", 
                    urls.url, 
                    COUNT (access."urlId") AS "visitCount"
                FROM urls
                LEFT JOIN access
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
};

async function listRanking () {

    return await connection.query(
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
            ORDER BY visits."visitCount" DESC, links."linksCount" DESC
            LIMIT 10;
        `
    );
};

export { listUser, listRanking };