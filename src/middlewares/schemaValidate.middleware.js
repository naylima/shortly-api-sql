import userSchema from '../schemas/user.schema.js';
import loginSchema from '../schemas/login.schema.js';

const schemaValidate = async (req, res, next) => {
  
    const validation = userSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail => detail.message));
        return res.status(422).send(errors);
    };

    next();

};

const loginSchemaValidate = async (req, res, next) => {
  
    const validation = loginSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail => detail.message));
        return res.status(422).send(errors);
    };

    next();

};

export { schemaValidate, loginSchemaValidate } ;