const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    titulo:             { type: String },
    episodio_id:        { type: Number },
    apertura:           { type: String },
    director:           { type: String },
    productor:          { type: String },
    lanzamiento_fecha:  { type: Date },
    personajes:         [{ type: Schema.Types.ObjectId, ref: 'People' }],
    planetas:           [{ type: Schema.Types.ObjectId, ref: 'Planet' }],
    starships:          [{ type: Schema.Types.ObjectId, ref: 'Starship' }],
    vehiculos:          [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
    especies:           [{ type: Schema.Types.ObjectId, ref: 'Species' }],
    creado:             { type: Date},
    editado:            { type: Date},
    url:                { type: String},
});

module.exports = mongoose.model('Film', FilmSchema);