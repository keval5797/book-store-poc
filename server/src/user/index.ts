import express from "express";
import * as controllers from "./controller";
const routes = express.Router();

routes.post("/login", controllers.login);

export default routes;
