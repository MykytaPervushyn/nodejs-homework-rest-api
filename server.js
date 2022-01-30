const mongoose = require("mongoose");

require("dotenv").config();

const { DB_HOST, PORT = 8080 } = process.env;

mongoose.connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  })

const app = require('./app')

