const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});


const Usuario = require('../models/Usuario');
const Club = require('../models/Club');
const Record = require('../models/Record');
const New = require('../models/New');

const crearTokenUsuario = (usuario, secreta, expiresIn) => {
    const {id, name, email, club, role} = usuario;
    return jwt.sign({id, name, email, club, role},secreta, { expiresIn } );

}

const resolvers = {
    Query: {
        obtenerUsuarios: async (_,{},ctx) => {
            const usuarios = await Usuario.find({}).populate('club');
            console.log(usuarios);
            return usuarios;
        },
        obtenerUsuario: async(_,{id},ctx) => {
            const usuario = await Usuario.findById(id);
            if(!usuario){
                throw new Error("El usuario no existe");
            }
            return usuario;
        },
        obtenerMiUsuario: async(_,{},ctx) => {
            return ctx;
        },
        obtenerClubs: async(_,{},ctx) => {
            const clubs = Club.find({});
            return clubs;
        },
        obtenerClub: async(_,{id}, ctx) => {
            const club = Club.findById(id);
            if(!club){
                throw new Error('No existe el club');
            }
            return club;
        },
        obtenerMiClub: async(_,{}, ctx) => {
            const {club} = ctx;
            try {
                const clubexiste = await Club.findById(club.id);
                return clubexiste;
            } catch (error) {
                throw new Error(error);
            }
        },
        obtenerRegistros: async (_,{},ctx) => {
            try {
                const records = await Record.find({});
                return(records);
            } catch (error) {
                throw new Error(error);
            }
        },
        obtenerRegistrosClub: async(_,{id},ctx) => {
            try {
                const records = await Record.find({'club': id})
                return(records);
            } catch (error) {
                throw new Error(error);
            }
        },
        obtenerRegistrosMiClub: async(_,{}, ctx) => {
            const {club} = ctx;
            try {
                const records = await Record.find({'club': club.id})
                return(records);
            } catch (error) {
                throw new Error(error);
            }
        },
        obtnerRegistro: async(_, {id}, ctx) => {
            try {
                const record = await Record.findById(id);
                return record
            } catch (error) {
                throw new Error(error);
            }
        },
        obtenerNews: async(_,{},ctx) => {
            try {
                const news = await New.find({});
                return news;
            } catch (error) {
                throw new Error(error);
            }
        },
        obtenerNew: async(_,{id},ctx) => {
            try {
                const ExisteNew = await New.findById(id);
                if(!existeClub){
                    throw new Error('La noticia no existe');
                }

                return ExisteNew;
            } catch (error) {
                throw new Error(error)
            }
        },
        obtenerNewsClub: async (_, {id}, ctx) => {
            try {
                const news = await New.find({club: id});
                return news;
            } catch (error) {
                throw new Error(error);
            }
        },
        obtenerNewsMiClub: async(_,{},ctx) => {
            try {
                const news =  await New.find({club: ctx.club.id});
                return news;
            } catch (error) {
                throw new Error(error);
            }
        }

    },
    Mutation: {
        crearNuevoUsuario: async(_,{input},ctx) => {
            const {email, password} = input;
            try {
                const usuarioExiste =  await Usuario.findOne({email});
                if(usuarioExiste){
                    throw new Error("El usuario ya existe");
                }
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password,salt);
                const usuarioFinal = new Usuario(input);
                usuarioFinal.save();
                return usuarioFinal
            } catch (error) {
                throw new Error(error);
            }
        },
        autenticarUsuario: async(_,{input},ctx) => {
            const {email,password} = input;9
            const usuarioExiste = await Usuario.findOne({email}).populate('club');
            console.log(usuarioExiste);
            if(!usuarioExiste){
                throw new Error("El usuario no existe");
            }
            const passwordCorrecto = await bcryptjs.compare(password,usuarioExiste.password);
            if(!passwordCorrecto){
                throw new Error('El usuario o la contraseña estan mal escritos');
            }
            return{
                token: crearTokenUsuario(usuarioExiste,process.env.SECRETA,'28D')
            }
        },
        actualizarUsuario: async(_,{id, input},ctx) => {
            const  existeUsuario = await Usuario.findById(id);
            if(!existeUsuario){
                throw new Error("El usuario no existe");
            }
            const newUsuario = await Usuario.findOneAndUpdate({_id: id},input,{new: true});
            return newUsuario;
        },
        eliminaUsuario: async(_,{id},ctx) => {
            const existeUsuario =  await Usuario.findById(id);
            if(!existeUsuario){
                throw new Error("El usuario no existe");
            }
            try {
                await Usuario.findOneAndDelete(id);
                return "Usuario eliminado";
            } catch (error) {
                throw new Error(error)
            }
        },
        crearClub: async(_,{input},ctx) => {
            try {
                const club = new Club(input);
                club.save();
                return club;
            } catch (error) {
                throw new Error(error)
            }
        },
        actualizarClub: async(_,{id, input}, ctx) => {
            try {
                const existeClub = Club.findById(id);
                if(!existeClub){
                    throw new Error('El club no existe');
                }

                const newClub = await Club.findByIdAndUpdate({_id: id}, input, {new: true});
                return newClub
            } catch (error) {
                throw new Error(error)
            }
        },
        eliminaClub: async(_,{id}, ctx) => {
            try {
                const existeClub = Club.findById(id);

                if(!existeClub){
                    throw new Error('El club no existe');
                }

                await Club.findByIdAndDelete(id);
                return('Clun eliminado');
            } catch (error) {
                throw new Error(error);
            }
        },
        crearRecord: async(_,{input}, ctx) => {
            try {
                const  newRecor = new Record(input);
                newRecor.save();
                return newRecor;
            } catch (error) {
                throw new Error(error)
            }
        },
        actualizaRecord: async(_,{id,input},ctx) => {
            try {
                const existeRecord = await Record.findById(id);
                if(!existeRecord){
                    throw new Error('El registro no existe');
                }
                const newRecord = await Record.findByIdAndUpdate({_id: id},input, {new: true});
                return newRecord;
            } catch (error) {
                throw new Error(error);
            }
        },
        eliminaRecord: async(_,{id},ctx) => {
            try {
                const existeRecord = await Record.findById(id);
                if(!existeRecord){
                    throw new Error('El registro no existe');
                }
                await Record.findByIdAndDelete(id);
                return 'Registro eliminado exitosamente'
            } catch (error) {
                throw new Error(error)
            }
        },
        crearNew: async(_,{input}, ctx) => {
            try {
                const newNew = new New(input);
                newNew.save();

                return newNew
            } catch (error) {
                throw new Error(error);
            }
        },
        actualizaNew: async(_,{id,input},ctx) => {
            try {
                const existeNew = await New.findById(id);
                if(!existeNew){
                    throw new Error('La noticia no existe');
                }

                const newNew = await New.findByIdAndUpdate({_id: id}, input, {new: true});
                return newNew;

            } catch (error) {
                throw new Error(error)
            }
        },
        eliminaNew: async(_,{id}, ctx) => {
            try {
                const existeNew = await New.findById(id);
                if(!existeNew){
                    throw new Error('La noticia no existe')
                }

                await New.findByIdAndDelete(id);
                return 'La noticia ha sido eliminada correctamente';
            } catch (error) {
                throw new Error(error);
            }
        }

    }
}

module.exports = resolvers;