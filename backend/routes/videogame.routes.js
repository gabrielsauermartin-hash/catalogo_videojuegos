module.exports = app => {
    const videogames = require("../controllers/videogame.controller.js");
    const auth = require("../controllers/auth.js");
    var upload = require('../multer/upload');

    var router = require("express").Router();

    //Create a new videogame
    router.post("/",auth.isAuthenticated, upload.single('file'), videogames.create);

    //Retrieve all videogames
    router.get("/", auth.isAuthenticated, videogames.findAll);

    //Retrieve a list by a certain user
    router.get("/my-videogames", auth.isAuthenticated, videogames.findByUser);

    //Retrieve a single videogame with id
    router.get("/:id", auth.isAuthenticated, videogames.findOne);

    //Update a videogame with id
    router.put("/:id", auth.isAuthenticated, upload.single('file'), videogames.update);

    //Delete a videogame with id
    router.delete("/:id", auth.isAuthenticated, videogames.delete);

    app.use('/api/videogames', router);
}