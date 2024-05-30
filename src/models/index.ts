import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

const dbPort = process.env.DB_PORT ?? '5432'
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: +dbPort,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  logging: console.log
})
export default sequelize
