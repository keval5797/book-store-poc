import express from "express";
import * as controllers from "./controller";
const routes = express.Router();

routes.get("/", controllers.getBooks);
routes.post("/", controllers.createBook);
routes.put("/:id", controllers.updateBook);
routes.delete("/:id", controllers.deleteBook);

export default routes;
