const express = require("express");
const cors = require("cors");
var path = require('path');

const app = express();

//public directory
app.use(express.static(path.join(__dirname, 'public')));

var corsOptions = {
    origin: "http://localhost:8100"
};
app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

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
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});