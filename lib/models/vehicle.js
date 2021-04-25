const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    nombre:             { type: String },
    modelo:             { type: String },
    fabricado:          { type: String },
    costo_en_creditos:  { type: String },
    longitud:           { type: String },
    velocidad_maxima:   { type: String },
    tripulacion:        { type: String },
    pasajeros:          { type: String },
    capacidad_carga:    { type: String },
    consumibles:        { type: String },
    clase_vehiculo:     { type: String },
    pilotos:            [{ type: Schema.Types.ObjectId, ref: 'People' }],
    peliculas:          [{ type: Schema.Types.ObjectId, ref: 'Film' }],
    creado:             { type: Date},
    editado:            { type: Date},
    url:                { type: String},
});

module.exports = mongoose.model('Vehicle', VehicleSchema);