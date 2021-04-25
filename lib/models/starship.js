const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StarshipSchema = new Schema({
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
    hiperimpulsor:      { type: String },
    MGLT:               { type: String },
    clase_nave:         { type: String },
    pilotos:            [{ type: Schema.Types.ObjectId, ref: 'People' }],
    peliculas:          [{ type: Schema.Types.ObjectId, ref: 'Film' }],
    creado:             { type: String},
    editado:            { type: String},
    url:                { type: String},
});

module.exports = mongoose.model('Starship', StarshipSchema);