//1)Se realiza una peticion a mi api, voy de routes hasta aca, controlers
//2)Paso a la capa de service(findCities)
//3)Paso a la capa de repositories(class CityRepositories)
//4)Se obtiene la data de 3ros
//5)Vuelvo a la capa service transformo la data en lo que necesito
//6)Vuelvo a la capa controlers con la data lista para volver a routes 

const express = require('express');
const {findWeather,weatherById} = require('../services/weatherService');
const logger = require('../loaders/logger');


const weatherByCoordinates = async function (req, res) {
    const { lon, lat } = req.query;
    res.json(await findWeather(lon, lat));

}

const weatherByCityId = async (req,res) => {
    try {
        const {id,city} = req.params;
        res.json(await weatherById(city, id));
    } catch (err) {
        next(err);
    }
}
module.exports = {
      weatherByCoordinates,
      weatherByCityId 
    
}
