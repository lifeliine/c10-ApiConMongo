const AppError = require('../errors/appErrors');
const {findByEmail, findById} = require('./userService');
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
        console.log('const idUser = user.id;',idUser);
        const token = jwt.sign({idUser},config.auth.secret,{expiresIn: config.auth.ttl});
        console.log('const token = jwt.sign({idUser},config.auth.secret,{expiresIn: config.auth.ttl});',token);
        return {
            token,
            user: user.name,
            role: user.role
        }
    } catch (error) {
        throw error;
    }
}

const validToken = async(token) => {
    try {
        //soi existe el token
        if(!token) {
            throw new AppError('Token required',401)
        }
        //validamos el token con el metodo verify que recibe el token y la clave secreta
        //recibe el objeto pero lo destructuramos para obtener el id
        let id;
        try {
            const {idUser} = jwt.verify(token,config.auth.secret); //es id user porque lo definimos con ese nombre antes
            //OBS sin destructurar es un objeto con idUser, fecha de inicio y fin de validez del token
            id = idUser;
        } catch (error) {
            throw new AppError('Invalid token!',401)
        }
        
        //si el user que tiene el token existe en la DB 
        const user = await findById(id);
        if(!user){
            throw new AppError('Invalid token, user not found.',401);
        }

        //si el user esta habilidato
        if(!user.enable){
            throw new AppError('User disabled',401);
        }

        return user; //llega aca si paso todas las validaciones

    } catch (error) {
        throw error;
    }
}

module.exports = {
    accesLogin,
    validToken
}