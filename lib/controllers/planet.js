const express = require('express');
const planetController = express.Router();
const Planet = require('../models/planet');


planetController
.get('/', async (req, res, next) => {
  const planet = await Planet.find()
  res.status(200).json({
      ok: true,
      planet
  })
})


const savePlanet = async(data) => {

    try {
        let homeworld = await Planet.findOne({ nombre: data.name });
        if ( homeworld ) {
            return homeworld;
        }

        
 
        homeworld = new Planet({
            nombre:     data.name,
            periodo_rotacion:     data.rotation_period,
            periodo_orbital:       data.orbital_period,
            diametro: data.diameter,
            clima: data.climate,
            gravedad:  data.gravity,
            terreno: data.terrain,
            surperficie_agua:     data.surface_water,
            poblacion:  data.population,
            residentes:      [],
            peliculas:    [], // data.films
            creado:   data.created,
            editado:  data.edited,
            url:    data.url,
        });
        await homeworld.save();

        // await loadPeoplePlanet(data.residents, homeworld);

        return homeworld;


    } catch (error) {
        throw new Error(error);
    }
    
}

module.exports = { planetController,
                   savePlanet }