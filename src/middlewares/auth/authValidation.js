const {check,validationResult} = require('express-validator');
const AppError = require('../../errors/appErrors');
const{validToken} = require('../../services/authService');
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

const validJWT = async (req,res,next) => {
    try {
        const token = req.header('Authorization');
        const user = await validToken(token);
        req.user = user;  //con esto cualquier req que venga por el middelware usara el user logeado
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    postAuthRequestValidations,
    validJWT
}