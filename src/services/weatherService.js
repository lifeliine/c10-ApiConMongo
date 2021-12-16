const WeatherRepository = require('../repositories/weatherRepository');
const weatherRepository = new WeatherRepository();
const CityRepository = require('../repositories/cityRepository');
const logger= require('../loaders/logger');
const cityRepository = new CityRepository();
 
const findWeather = async(lon,lat) => {
    const weather = await weatherRepository.acquireWeather(lon,lat);
    return {
        description: weather.weather[0].description,
        temperature: weather.main.temp,
        temperatureMin: weather.main.temp_min,
        temperatureMax: weather.main.temp_max
    };
}

const weatherById = async(city,id) => {
    const cities = await cityRepository.findCity(city);
    const cityData =  cities.features.find(e => e.id === id);
    const lon = cityData.geometry.coordinates[0];
    const lat = cityData.geometry.coordinates[1];
    return await findWeather(lon, lat);
}

module.exports = {
    findWeather,
    weatherById
}
