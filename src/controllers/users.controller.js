import * as usersRepository from '../repositories/users.repository.js';

const listUser = async (req, res) => {

    const user = res.locals.user;

    try {
        const isUser = await usersRepository.listUser(user);

        if (isUser.rowCount === 0) {
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
        const ranking = await usersRepository.listRanking();
        res.status(200).send(ranking.rows);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500); 
    }
}

export { listUser, listRanking };