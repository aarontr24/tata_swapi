const express = require('express');
const vehicleController = express.Router();
const Vehicle = require('../models/vehicle');


vehicleController
.get('/', async (req, res, next) => {
  const vehicle = await Vehicle.find()
  res.status(200).json({
      ok: true,
      vehicle
  })
})


const saveVehicle = async(data) => {
    try {
        let vehicle = await Vehicle.findOne({ nombre: data.name });
        if ( vehicle ) {
            return vehicle;
        }

        vehicle = new Vehicle({
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
            clase_vehiculo:    data.vehicle_class,
            pilotos:   [], // data.pilots
            peliculas:  [], // data.films
            creado:    data.created,
            editado:    data.edited,
            url:    data.url,
        });
        await vehicle.save();
        return vehicle;
    } catch (error) {
        throw new Error(error);
    }   
}

module.exports = { vehicleController,
                    saveVehicle }