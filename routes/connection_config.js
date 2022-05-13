var mysql = require("mysql");
var con = {
  host: "containers-us-west-56.railway.app",
  user: "root",
  password: "f2oNVF1UFvzxtqsJX2oi",
  port: "7060",
  databse: "cnpm",
  insecureAuth: "true",
};
var dbcon = mysql.createConnection(con);

module.exports = dbcon;
