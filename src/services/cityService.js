//ACA MANEJO LOS DATOS DE 3RO COMO NECESITO
const cityRepository = require('../repositories/cityRepository');
const repository = new cityRepository();

const findCities = async(city) => {
    const cities = await repository.findCity(city);

    return cities.features.map(e => {
        return {
            id: e.id,
            name: e.place_name,
            lon: e.geometry.coordinates[0],
            lat: e.geometry.coordinates[1] 
        }
    });
}

module.exports = {
    findCities
}