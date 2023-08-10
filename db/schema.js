const {gql} = require('apollo-server');

const typeDefs = gql`

    enum Role {
        ADMINISTRADOR
        USUARIO
        SUPERADMINISTRADOR
    }

    type Photo {
        url: String
    }

    type Schedule {
        day: Int
        Hour: String
    }

    type Usuario {
        id: ID!
        name: String
        email: String
        role: Role
        club: Club
    }

    type Club {
        id: ID
        name: String
        description: String
        photos: [Photo]
        schedule: [Schedule]
    }
    type CountRecords {
        name: String
        count: Int
    }
    type Record {
        id: ID
        name: String
        enrollment: String
        career: String
        semester: String
        phone: String
        club: Club
    }

    type New {
        id: ID
        title: String
        text: String
        club: Club
        publisher: Usuario
    }

    type Token {
        token: String
    }

    type Temporada {
        name: String
        startDate: String
        endDate: String
        registro: Boolean
    }

    input TemporadaInput {
        id: ID
        name: String
        startDate: String
        endDate: String
    }

    input UsuarioInput {
        name: String!
        email: String!
        password: String
        role: Role
        club: ID
    }

    input PhotoInput {
        url: String!
    }

    input ScheduleInput {
        day: Int!
        Hour: String!
    }

    input ClubInput {
        name: String!
        description: String!
        photos: [PhotoInput]
        schedule: [ScheduleInput]
    }

    input RecordInput {
        name: String!
        enrollment: String!
        career: String!
        semester: String!
        phone: String!
        club: ID!
    }

    input NewInput {
        title: String!
        text: String!
        club: ID
        publisher: ID
    }

    input AuthInput {
        email: String!
        password: String!
    }

    type Query {
        obtenerUsuarios: [Usuario]
        obtenerUsuario(id: ID!): Usuario
        obtenerMiUsuario : Usuario

        #clubs

        obtenerClubs: [Club]
        obtenerClub(id: ID!): Club
        obtenerMiClub: Club

        #registros

        obtenerRegistros: [Record]
        obtenerRegistrosClub(id: ID!): [Record]
        obtenerRegistrosMiClub: [Record]
        obtnerRegistro(id: ID!): Record

        #news

        obtenerNews: [New]
        obtenerNew(id: ID!): New
        obtenerNewsClub(id: ID): [New]
        obtenerNewsMiClub: [New]


        obtenerNumerosRecords: [CountRecords]
        obtenerNumerosNotices: [CountRecords]
        obtenerNumerosRecordsClubs: Int
        

        #Temporadas

        obtenerTemporadas: [Temporada]
        obtenerTemporada(id: ID!): Temporada
        obtenerTemporadaActual: Temporada
    }

    type Mutation {
        crearNuevoUsuario(input: UsuarioInput): Usuario
        autenticarUsuario(input: AuthInput): Token
        actualizarUsuario(id:ID!, input: UsuarioInput): Usuario
        eliminaUsuario(id: ID!): String

        #clubs
        crearClub(input: ClubInput): Club
        actualizarClub(id:ID!, input: ClubInput): Club
        eliminaClub(id: ID!): String

        #Record
        crearRecord(input: RecordInput): Record
        actualizaRecord(id: ID!, input: RecordInput): Record
        eliminaRecord(id: ID!): String

        #new
        crearNew(input: NewInput): New
        actualizaNew(id: ID!, input: NewInput): New
        eliminaNew(id: ID!): String

        #temporadas
        crearTempodada(input: TemporadaInput): Temporada
        actualizarTemporada(id: ID!, input: TemporadaInput): Temporada
        eliminaTemporada(id: ID!): String
    }

`;
module.exports = typeDefs;
