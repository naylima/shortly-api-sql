import joi from 'joi';

const loginSchema = joi.object({
    email: joi.string().email().required().empty(' '),
    password: joi.string().min(3).max(10).required()
});

export default loginSchema;