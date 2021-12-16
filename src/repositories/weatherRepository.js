const axios = require('axios');
const config = require('../config/index');
const logger = require('../loaders/logger');

class WeatherRepository{
    constructor(){
        this.pathBase = config.openweathermap.pathBase;
        this.appid = config.openweathermap.apikey;
        this.units = 'metric';
        this.lang = 'es';
    }

    async acquireWeather(lon,lat){
        try {
            const instance = axios.create({
                baseURL: `${this.pathBase}`,
                params: {
                    'lat': lat,
                    'lon': lon,
                    'appid': this.appid,
                    'units': this.units,
                    'lang': this.lang
                }
            })

            const response = await instance.get();

            return response.data;

        } catch (error) {
            throw error;
        }
    }
}

module.exports = WeatherRepository;