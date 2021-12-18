const {check,validationResult} = require('express-validator');
const AppError = require('../../errors/appErrors');

//OBS CREAR UN NUEVO ARCHIVO VALIDATION DONDE SE ALMACENEN LAS VALIDACIONES EN COMUN ENTRE AUTH Y USER


const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email invalid').isEmail();
const _passwordRequired = check('password', 'Password required').not().isEmpty();

const _validationResult = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        throw new AppError('Validation Errors', 400, error.errors);
    }
    next();
}

postAuthRequestValidations = [
    _emailRequired,
    _emailValid,
    _passwordRequired,
    _validationResult
]

module.exports = {
    postAuthRequestValidations
}