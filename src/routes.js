const { Router } = require("express");
const BookController = require('./controllers/BookController')

const routes = Router();

routes.get("/bookmanager", BookController.index);
routes.get("/bookmanager/:id", BookController.show);
routes.post("/bookmanager", BookController.store);
routes.put("/bookmanager/:id", BookController.update);
routes.delete("/bookmanager/:id", BookController.delete);

module.exports = routes;
