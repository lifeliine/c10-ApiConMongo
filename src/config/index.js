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
    mapbox:{
        apikey: process.env.MAPBOX_API_KEY,
        pathBase: 'https://api.mapbox.com/geocoding/v5/mapbox.places/'
    },
    openweathermap: {
        apikey: process.env.OPENWEATHERMAP_API_KEY,
        pathBase: 'https://api.openweathermap.org/data/2.5/weather'
    }
}