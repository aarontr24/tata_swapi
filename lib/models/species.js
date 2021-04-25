const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpeciesSchema = new Schema({
    altura_promedio:    { type: String },
    vida_promedio:      { type: String },
    clasificacion:      { type: String },
    creado:             { type: Date },
    designacion:        { type: String },
    editado:            { type: Date },
    color_ojos:         { type: String },
    color_cabello:      { type: String },
    planeta_origen:     { type: Schema.Types.ObjectId, ref: 'Planet' },
    lenguaje:           { type: String },
    nombre:             { type: String },
    personajes:         [{ type: Schema.Types.ObjectId, ref: 'People' }],
    peliculas:          [{ type: Schema.Types.ObjectId, ref: 'Film' }],
    color_piel:         { type: String},
    url:                { type: String},
});

module.exports = mongoose.model('Species', SpeciesSchema);