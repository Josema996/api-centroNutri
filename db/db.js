import {Sequelize} from 'sequelize'

const db = new Sequelize('consultorio_nutricional', 'root', '',{
    host:'localhost',
    dialect:'mysql'
})

export default db