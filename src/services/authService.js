const AppError = require('../errors/appErrors');
const {findByEmail} = require('./userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

const accesLogin = async(email,password) => {
    try {
        
        //validacion mail
        const user = await findByEmail(email);
        if(!user) {
            throw new AppError('Authentification failed!, email/password', 400)
        }
        
        //en el schema de la db creamos el atributo boolean enable para saber si esta vigente el user o baneado
        if(!user.enable){
            throw new AppError('Authentification failed!, User disabled', 400)
        }
        
        //Validacion pass
        const validatePassword = await bcrypt.compare(password,user.password);
        if(!validatePassword){
            throw new AppError('Authentification failed!, password/email', 400)
        }

        //creando jwt({id} = lo que queremos pasar a token, secret = clave privada, por eso la dejamos en el .env, ttl=tiempo expira)
        const idUser = user.id; //aca pone user._id
        const token = jwt.sign({idUser},config.auth.secret,{expiresIn: config.auth.ttl});
        return {
            token,
            user: user.name,
            role: user.role
        }
    } catch (error) {
        throw error;
    }
}

module.exports = {
    accesLogin
}