//El .env no se versiona porque tiene data sensible, entonces verificamos si se creo antes de inicial la app
//si no se encuentra avisamos con un error
const dotenv = require('dotenv');

const envFound = dotenv.config();
if (!envFound){
    throw new Error("Couldn't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = {
    port: process.env.PORT,
    api: {
        prefix: '/api/v1'
    },
    log:{
        level:process.env.LOG_LEVEL
    },
    swagger: {
        path: '/api-docs'
    },
    databaseURL : process.env.DATABASE_URL
}