import { nanoid } from 'nanoid';
import * as urlsRepository from '../repositories/urls.repository.js';

const postUrl = async (req, res) => {

    const shortUrl = nanoid(8);
    const user = res.locals.user;
    const url = res.locals.url;
 
    try {
        await urlsRepository.insertUrl(user, url, shortUrl);
        res.status(201).send({"shortUrl": shortUrl});
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);   
    }

};

const listUrl = async (req, res) => {
    
    const { id } = req.params;

    try {
        const url = await urlsRepository.getUrlbyId(id);

        if (url.rowCount > 0) {
            res.status(200).send(url.rows[0]);
        } else {
            return res.sendStatus(404);
        }    
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500);   
    }
};

const openUrl = async (req, res) => {

    const { shortUrl } = req.params;

    try {
        const url = await urlsRepository.getUrlbyShortUrl(shortUrl);

        if (url.rowCount === 0) {
            return res.sendStatus(404);
        };

        await urlsRepository.insertAccess(url);
        
        const link = url.rows[0].url;        
        res.redirect(link);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500); 
    }

};

const deleteUrl = async (req, res) => {

    const { id } = req.params;
    const user = res.locals.user;

    try {
        const url = await urlsRepository.getUrlbyId(id);

        if (url.rowCount === 0) {
            return res.sendStatus(404);
        };

        const userHasUrl = await urlsRepository.getUrlbyIdAndUserId(id, user);

        if (userHasUrl.rowCount === 0) {
            return res.sendStatus(401);
        }; 

        await urlsRepository.deleteUrlbyId(id);
        res.sendStatus(204);
        
    } catch (error) {
        console.log(error.message);
        return res.sendStatus(500); 
    }
};

export { postUrl, listUrl, openUrl, deleteUrl };