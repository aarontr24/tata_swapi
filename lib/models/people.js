const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PeopleSchema = new Schema({
  nombre:         { type: String },
  altura:         { type: String },
  peso:           { type: String },
  color_cabello:  { type: String },
  color_piel:     { type: String },
  color_ojos:     { type: String },
  ano_nacimiento: { type: String },
  genero:         { type: String, enum: ['female', 'male', 'n/a'] },
  planeta_origen: { type: Schema.Types.ObjectId, ref: 'Planet' },
  peliculas:      [{ type: Schema.Types.ObjectId, ref: 'Film' }],
  especies:       [{ type: Schema.Types.ObjectId, ref: 'Species' }],
  vehiculos:      [{ type: Schema.Types.ObjectId, ref: 'Vehicle' }],
  naves:          [{ type: Schema.Types.ObjectId, ref: 'Starship' }],
  creado:         { type: Date },
  editado:        { type: Date },
  url:            { type: String },
});
module.exports = mongoose.model('People', PeopleSchema)