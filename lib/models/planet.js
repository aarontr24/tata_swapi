const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlanetSchema = new Schema({
    nombre:             { type: String, required: true },
    periodo_rotacion:   { type: String, required: true },
    periodo_orbital:    { type: String, required: true },
    diametro:           { type: String, required: true },
    clima:              { type: String, required: true },
    gravedad:           { type: String, required: true },
    terreno:            { type: String, required: true },
    surperficie_agua:   { type: String, required: true },
    poblacion:          { type: String, required: true },
    residentes:         [{ type: Schema.Types.ObjectId, ref: 'People' }],
    peliculas:          [{ type: Schema.Types.ObjectId, ref: 'Film' }],
    creado:             { type: Date, required: true },
    editado:            { type: Date, required: true },
    url:                { type: String, required: true },
});


module.exports = mongoose.model('Planet', PlanetSchema);