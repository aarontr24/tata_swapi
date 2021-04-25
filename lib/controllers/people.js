const express = require('express');
const axios = require('axios');
const peopleController = express.Router();
const People = require('../models/people');
const { savePlanet } = require('./planet');
const { saveFilm } = require('./film');
const { saveSpecies } = require('./species');
const { saveVehicle } = require('./vehicle');
const { saveStarship } = require('./starship');

peopleController
    .post('/', async (req, res, next) => {
        const search = req.query.search;
        try {
            const data = await axios.get(`https://swapi.py4e.com/api/people/`, {
                params: {
                    search
                }
            });
    
            if (data.data.results.length < 1) {
                return res.status(500).json({
                    ok: true,
                    msg: 'No hay resultados'
                })
            }
    
            const dataDB = await Promise.all(data.data.results.map(async(item) => {
                return await savePeople(item);
            }));
            
            return res.json({
                ok: true,
                data: dataDB
            })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Contacte con el administrador'
            })
            
        }
    })

peopleController
  .get('/', async (req, res, next) => {
    const people = await People.find()
    res.status(200).json({
        ok: true,
        people
    })
  })

const savePeople = async(data) => {
    try {
        let people = await People.findOne({ nombre: data.name });
        if ( people ) {
            return people;
        }

        people = new People({
            nombre:     data.name,
            altura:     data.height,
            peso:       data.mass,
            color_cabello: data.hair_color,
            color_piel: data.skin_color,
            color_ojos:  data.eye_color,
            ano_nacimiento: data.birth_year,
            genero:     data.gender,
            planeta_origen:  null,
            peliculas:      [], // data.films
            especies:    [], // data.species
            vehiculos:   [], // data.vehicles
            naves:  [], // data.starships
            creado:    data.created,
            editado:     data.edited,
            url:        data.url,
        });
        await people.save();

        await loadHomeworldPeople(data.homeworld, people);
        await loadFilmsPeople(data.films, people);
        await loadSpeciesPeople(data.species, people);
        await loadVehiclesPeople(data.vehicles, people);
        await loadStarshipsPeople(data.starships, people);

        return people;
    } catch (error) {
        throw new Error(error);
    }   
}

const loadHomeworldPeople = async(planet, character) => {
    try {
        const homeWorld = await getDataApi(planet);
        const homeWorldDB = await savePlanet(homeWorld);

        const characterDB = await People.findById(character.id);

        if (characterDB) {
            characterDB.planeta_origen = homeWorldDB.id;
            await characterDB.save();
        }
        
    } catch (error) {
        throw new Error(error);
    }
}

const loadFilmsPeople = async(films, character) => {
    const filmsDB = await Promise.all(films.map(async(item) => {
        return await getDataApi(item);
    }));

    const filmsID = await Promise.all(filmsDB.map(async(item) => {
        const filmID = await saveFilm(item);
        return filmID.id;
    }));
    
    try {
        const characterDB = await People.findById(character.id);
        if (characterDB) {
            characterDB.peliculas = filmsID;
            await characterDB.save();
        }
        
    } catch (error) {
        throw new Error(error);
    }
}

const loadSpeciesPeople = async(species, character) => {
    const speciesDB = await Promise.all(species.map(async(item) => {
        return await getDataApi(item);
    }));

    const speciesID = await Promise.all(speciesDB.map(async(item) => {
        const speciesID = await saveSpecies(item);
        return speciesID.id;
    }));
    
    try {
        const characterDB = await People.findById(character.id);
        if (characterDB) {
            characterDB.especies = speciesID;
            await characterDB.save();
        }
        
    } catch (error) {
        throw new Error(error);
    }
}

const loadVehiclesPeople = async(vehicle, character) => {
    const vehicleDB = await Promise.all(vehicle.map(async(item) => {
        return await getDataApi(item);
    }));

    const vehicleID = await Promise.all(vehicleDB.map(async(item) => {
        const vehicleID = await saveVehicle(item);
        return vehicleID.id;
    }));
    
    try {
        const characterDB = await People.findById(character.id);
        if (characterDB) {
            characterDB.vehiculos = vehicleID;
            await characterDB.save();
        }
        
    } catch (error) {
        throw new Error(error);
    }
}

const loadStarshipsPeople = async(starship, character) => {
    const starshipDB = await Promise.all(starship.map(async(item) => {
        return await getDataApi(item);
    }));

    const starshipID = await Promise.all(starshipDB.map(async(item) => {
        const starshipID = await saveStarship(item);
        return starshipID.id;
    }));
    
    try {
        const characterDB = await People.findById(character.id);
        if (characterDB) {
            characterDB.naves = starshipID;
            await characterDB.save();
        }
        
    } catch (error) {
        throw new Error(error);
    }
}

const getDataApi = async(url) => {
    try {
        const data = await axios.get(url);

        return data.data;
        
    } catch (error) {
        return error 
    }
}
  
module.exports = peopleController