module.exports = app => {
    const videogames = require("../controllers/videogame.controller.js");
    var upload = require('../multer/upload');

    var router = require("express").Router();

    //Create a new videogame
    router.post("/", upload.single('file'), videogames.create);

    //Retrieve all videogames
    router.get("/", videogames.findAll);

    //Retrieve a single videogame with id
    router.get("/:id", videogames.findOne);

    //Update a videogame with id
    router.put("/:id", upload.single('file'), videogames.update);

    //Delete a videogame with id
    router.delete("/:id", videogames.delete);

    app.use('/api/videogames', router);
}