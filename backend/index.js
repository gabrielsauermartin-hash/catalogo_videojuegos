require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
var path = require('path');

const app = express();
const port = process.env.PORT || 4000;

var corsOptions = {
    origin: "http://localhost:8100"
};
app.use(cors(corsOptions));

//parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
//app.use(express.json());
//app.use(express.urlencoded({ extended: true }));

//Middleware that makes sure that req.body is not undifined
app.use((req, res, next) => {
  if (req.body === undefined) {
    req.body = {};
  }
  next();
});


// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

//public directory
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/user.routes.js')(app);
require('./routes/videogame.routes.js')(app);

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header, url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  if(req.headers.authorization && req.headers.authorization.indexOf('Basic ') === 0){
    // verify auth basic credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    req.body.username = username;
    req.body.password = password;

    return next();
  }

  token = token.replace('Bearer ', '');
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      req.token = token;
      next();
    }
  });
});

const db = require("./models");
//Like this, doesn't delete database data
//db.sequelize.sync();

//Drop and re-sync database
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});


//Simple route example
app.get("/", (req, res) => {
    res.json({ message: "Welcome to videogames application."});
});

require("./routes/videogame.routes.js")(app);

//Set port, listen for requests
//********Quizás haya que quitar la línea 84*********
//const PORT = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
});