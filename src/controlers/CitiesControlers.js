//1)Se realiza una peticion a mi api, voy de routes hasta aca, controlers
//2)Paso a la capa de service(findCities)
//3)Paso a la capa de repositories(class CityRepositories)
//4)Se obtiene la data de 3ros
//5)Vuelvo a la capa service transformo la data en lo que necesito
//6)Vuelvo a la capa controlers con la data lista para volver a routes 

const express = require('express');
const {findCities} = require('../services/cityService');

const cities = async function (req, res) {
    res.json(await findCities(req.params.city));
}

module.exports = {
      cities
}
