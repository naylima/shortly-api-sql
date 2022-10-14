async function urlValidade (req, res, next) {

    const { url } = req.body;

    try {

        const isUrl = new URL(url);
        res.locals.url = isUrl;
        next();

      } catch(error) {
        console.log(error.message);
        return res.sendStatus(422); 
      }

};

export default urlValidade;