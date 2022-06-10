var Connection = require("tedious").Connection;
var config = {
  server: "DESKTOP-FLFGLMOSQLEXPRESS", //update me
  authentication: {
    type: "default",
    options: {
      userName: "", //update me
      password: "", //update me
    },
  },
  options: {
    // If you are on Microsoft Azure, you need encryption:
    encrypt: true,
    database: "FilmDatabase", //update me
  },
};
var connection = new Connection(config);
connection.connect();

module.exports = connection;
