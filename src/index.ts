'use strict'

import dotenv from 'dotenv'
import app from './app'
import db from './models/index'

dotenv.config()

const PORT = process.env.PORT ?? 3000

db.authenticate()
  .then(() => {
    console.log('Connnection to the database has been established succesfully.')
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`)
      return app
    })
  })
  .catch((err: any) => console.error('Unable to connect to the database:', err))
