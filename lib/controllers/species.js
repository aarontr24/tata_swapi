const express = require('express');
const speciesController = express.Router();
const Species = require('../models/species');


speciesController
.get('/', async (req, res, next) => {
  const species = await Species.find()
  res.status(200).json({
      ok: true,
      species
  })
})


const saveSpecies = async(data) => {
    try {
        let species = await Species.findOne({ nombre: data.name });
        if ( species ) {
            return species;
        }

        species = new Species({
            altura_promedio:     data.average_height,
            vida_promedio:     data.average_lifespan,
            clasificacion:       data.classification,
            creado: data.created,
            designacion: data.designation,
            editado:  data.edited,
            color_ojos: data.eye_colors,
            color_cabello:     data.hair_colors,
            planeta_origen: null, // data.homeworld
            lenguaje:      data.language,
            nombre:    data.name,
            personajes:   [], // data.people
            peliculas:  [], // data.films
            color_piel:    data.skin_colors,
            url:    data.url,
        });
        await species.save();
        return species;
    } catch (error) {
        throw new Error(error);
    }   
}

module.exports = { speciesController,
                   saveSpecies }