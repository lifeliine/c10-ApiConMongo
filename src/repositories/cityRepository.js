///OBTENGO LOS DATOS DESDE LA API DE 3ROS
const axios = require('axios');
const config = require('../config/index');
const logger = require('../loaders/logger');


class cityRepository {
    constructor(){
        this.limit = 10;
        this.language = 'es';
        this.pathBase = config.mapbox.pathBase;
        this.apiKey = config.mapbox.apikey;
    }

    async findCity(city) {
        try {
            
            const instance = axios.create({
                baseURL: `${this.pathBase}${city}.json`,
                params: {
                    'access_token': this.apiKey,
                    'limit': this.limit,
                    'lenguage': this.language
                }
            });
            const response = await instance.get();
            return response.data;
            
        } catch (error) {
            throw error;
        }
    }
}

module.exports = cityRepository;