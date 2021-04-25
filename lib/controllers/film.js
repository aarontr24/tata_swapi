const express = require('express');
const filmController = express.Router();
const Film = require('../models/film');


filmController
.get('/', async (req, res, next) => {
  const film = await Film.find()
  res.status(200).json({
      ok: true,
      film
  })
})


const saveFilm = async(data) => {
    try {
        let film = await Film.findOne({ titulo: data.title });
        if ( film ) {
            return film;
        }

        film = new Film({
            titulo:     data.title,
            episodio_id:     data.episode_id,
            apertura:       data.opening_crawl,
            director: data.director,
            productor: data.producer,
            lanzamiento_fecha:  data.release_date,
            personajes: [],
            planetas:     [],
            starships:  [],
            vehiculos:      [],
            especies:    [],
            creado:   data.created,
            editado:  data.edited,
            url:    data.url,
        });
        await film.save();

        // let caracterDB = character;

        // if (!character) {
        //     let film = await getDataApi(data.homeworld);
        //     homeWorldDB = await savePlanet(homeWorld1);
        // }



        return film;
    } catch (error) {
        throw new Error(error);
    }   
}

module.exports = { filmController,
                   saveFilm }