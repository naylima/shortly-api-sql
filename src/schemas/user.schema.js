import joi from 'joi';

const userSchema = joi.object ({
    name: joi.string().required().empty(' '),
    email: joi.string().email().required().empty(' '),
    password: joi.string().min(3).max(10).required(),
    confirmPassword: joi.valid(joi.ref('password')).required()
});

export default userSchema;

