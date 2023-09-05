const express = require("express");
const cors = require('cors');
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT

    this.paths = {
      auth:       '/api/auth',
      categories: '/api/categories',
      products:   '/api/products',
      search:     '/api/search',
      users:      '/api/users',
    }

    // Middlewares
    this.middlewares();

    // Database connection
    this.connectDB()

    // Application routes
    this.routes();
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth'))
    this.app.use(this.paths.categories, require('../routes/categories'))
    this.app.use(this.paths.products, require('../routes/products'))
    this.app.use(this.paths.search, require('../routes/search'))
    this.app.use(this.paths.users, require('../routes/user'))
  }

  async connectDB(){
    await dbConnection()
  }

  middlewares() {

    // CORS
    this.app.use(cors())

    // PARSING AND READING FOR THE REQUESTS BODY
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
