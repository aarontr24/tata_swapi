const express = require('express');
const starshipController = express.Router();
const Starship = require('../models/starship');


starshipController
.get('/', async (req, res, next) => {
  const starship = await Starship.find()
  res.status(200).json({
      ok: true,
      starship
  })
})


const saveStarship = async(data) => {
    try {
        let starship = await Starship.findOne({ nombre: data.name });
        if ( starship ) {
            return starship;
        }

        starship = new Starship({
            nombre:     data.name,
            modelo:     data.model,
            fabricado:       data.manufacturer,
            costo_en_creditos: data.cost_in_credits,
            longitud: data.length,
            velocidad_maxima:  data.max_atmosphering_speed,
            tripulacion: data.crew,
            pasajeros:     data.passengers,
            capacidad_carga: data.cargo_capacity,
            consumibles:      data.consumables,
            hiperimpulsor:    data.hyperdrive_rating,
            MGLT:   data.MGLT,
            clase_nave:  data.starship_class,
            pilotos:    [], // data.pilots
            peliculas:    [], // data.films
            creado:    data.created,
            editado:    data.edited,
            url:    data.url,
        });
        await starship.save();
        return starship;
    } catch (error) {
        throw new Error(error);
    }   
}

module.exports = { starshipController,
                    saveStarship }