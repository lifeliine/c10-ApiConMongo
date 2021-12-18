const {check,validationResult} = require('express-validator');
const AppError = require('../../errors/appErrors');
const userService = require('../../services/userService')

//creamos validaciones 
const _nameRequired = check('name', 'Name required').not().isEmpty();
const _LastnameRequired = check('lastName', 'Lastname required').not().isEmpty();
const _emailRequired = check('email', 'Email required').not().isEmpty();
const _emailValid = check('email', 'Email invalid').isEmail();
const _passwordRequired = check('password', 'Password required').not().isEmpty();
const _dateValid = check('birthdate').optional().isDate('MM-DD-YYYY');

//Validacion personalizada 
const _emailExist = check('email').custom(
    async(email = '') => {
        const userEmailFound =await userService.findByEmail(email);
        if(userEmailFound) {
            throw new AppError('Email already exist in DB', 400);
        }
    }
)

const _roleValid = check('role').optional().custom(
    async(role = '') => {
        const roles = ['USER_ROLE','ADMIN_ROLE'];
        if(!roles.includes(role)) {
            throw new AppError('Invalid Role', 400);
        }
    }
)

const idExist = check('id').custom(
    async(id = '') => {
        const userFound = await userService.findById(id);
        if(!userFound) {
            throw new AppError('ID does not exist in DB', 400);
        }
    }
)


const _idIsMongo = check('id').isMongoId().withMessage('ID does not exist in DB');

const _OptionalEmailValid = check('email', 'Email invalid').optional().isEmail();

const _OptionalEmailExist = check('email').optional().custom(
    async(email = '') => {
        const userEmailFound =await userService.findByEmail(email);
        if(userEmailFound) {
            throw new AppError('Email already exist in DB', 400);
        }
    }
)

// vemos si hay errores producidos por la validacion
const _validationResult = (req,res,next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        throw new AppError('Validation Errors', 400, error.errors);
    }
    next();
}


const postRequestValidations = [
    _nameRequired,
    _LastnameRequired,
    _emailRequired,
    _emailValid,
    _emailExist,
    _passwordRequired,
    _roleValid,
    _dateValid,
    _validationResult
]

const putRequestValidations = [
    _OptionalEmailValid,
    _OptionalEmailExist,
    _roleValid,
    _dateValid,
    idExist,
    _validationResult

]

const getRequestValidations = [
    idExist,
    _validationResult
]

const deleteRequestValidations = [
    _idIsMongo,
    idExist,
    _validationResult
]

module.exports = {
    postRequestValidations,
    putRequestValidations,
    getRequestValidations,
    deleteRequestValidations
}