const express = require("express");
const cors = require('cors')

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT
    this.usersPath = '/api/users'

    // Middlewares
    this.middlewares();

    // Application routes
    this.routes();
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user'))
  }

  middlewares() {

    // CORS
    this.app.use(cors())

    // PARSEO LECTURA DE BODY
    this.app.use(express.json())

    // Directorio publico
    this.app.use(express.static("public"));
  }

  listen() {
    this.app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

module.exports = Server;
